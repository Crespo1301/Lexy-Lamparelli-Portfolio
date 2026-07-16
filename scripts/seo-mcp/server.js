#!/usr/bin/env node
// Read-only MCP server: Google Search Console + GA4 health tools.
// Auth: a Google service account with read-only scopes. Config via env:
//   GSC_GA_SA_KEYFILE  absolute path to the service-account JSON key
//   GSC_SITE_URL       Search Console property (default sc-domain:lexylamparelli.cv)
//   GA4_PROPERTY_ID    NUMERIC GA4 property id (NOT the G- measurement id)
//
// Built config-driven so the same binary can serve any CSolutions client site.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { google } from "googleapis";
import { z } from "zod";

const KEYFILE = process.env.GSC_GA_SA_KEYFILE;
const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:lexylamparelli.cv";
const RAW_GA4_ID = process.env.GA4_PROPERTY_ID || "";

if (!KEYFILE) {
  console.error("GSC_GA_SA_KEYFILE is not set. See docs/seo-monitoring.md.");
  process.exit(1);
}
// Accept either "123456789" or "properties/123456789".
const GA4_PROPERTY = RAW_GA4_ID
  ? RAW_GA4_ID.startsWith("properties/")
    ? RAW_GA4_ID
    : `properties/${RAW_GA4_ID}`
  : "";

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILE,
  scopes: [
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/analytics.readonly",
  ],
});

const searchconsole = google.searchconsole({ version: "v1", auth });
const analyticsdata = google.analyticsdata({ version: "v1beta", auth });

// --- date helpers -----------------------------------------------------------
function isoDaysAgo(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function requireGa4() {
  if (!GA4_PROPERTY) {
    throw new Error(
      "GA4_PROPERTY_ID is not set. Add the numeric property id from GA4 Admin → Property Settings."
    );
  }
}

// --- Search Console calls ----------------------------------------------------
async function gscQuery({ startDate, endDate, dimensions, rowLimit, type }) {
  const res = await searchconsole.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions: dimensions?.length ? dimensions : undefined,
      rowLimit: rowLimit ?? 25,
      type: type || "web",
    },
  });
  return res.data;
}

async function gscSitemaps() {
  const res = await searchconsole.sitemaps.list({ siteUrl: SITE_URL });
  return res.data;
}

async function gscInspect(inspectionUrl) {
  const res = await searchconsole.urlInspection.index.inspect({
    requestBody: { inspectionUrl, siteUrl: SITE_URL },
  });
  return res.data;
}

// --- GA4 calls ---------------------------------------------------------------
async function ga4Report({ startDate, endDate, metrics, dimensions, limit }) {
  requireGa4();
  const res = await analyticsdata.properties.runReport({
    property: GA4_PROPERTY,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      metrics: metrics.map((name) => ({ name })),
      dimensions: (dimensions || []).map((name) => ({ name })),
      limit: String(limit ?? 25),
    },
  });
  return res.data;
}

// Flatten a GA4 runReport response into plain rows for easy reading.
function flattenGa4(report) {
  const dimHeaders = (report.dimensionHeaders || []).map((h) => h.name);
  const metHeaders = (report.metricHeaders || []).map((h) => h.name);
  const rows = (report.rows || []).map((r) => {
    const obj = {};
    (r.dimensionValues || []).forEach((v, i) => (obj[dimHeaders[i]] = v.value));
    (r.metricValues || []).forEach((v, i) => (obj[metHeaders[i]] = v.value));
    return obj;
  });
  return { dimensions: dimHeaders, metrics: metHeaders, rows };
}

function ok(data) {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}
function fail(err) {
  const msg = err?.errors?.[0]?.message || err?.message || String(err);
  return {
    isError: true,
    content: [{ type: "text", text: `Error: ${msg}` }],
  };
}

// --- MCP server --------------------------------------------------------------
const server = new McpServer({ name: "seo-health-mcp", version: "1.0.0" });

server.tool(
  "seo_health_overview",
  "One-shot SEO health snapshot for the configured site: GA4 traffic (last 28d), GSC search performance + top queries (last 28d), and sitemap status. Use this first to answer 'is the site healthy?'.",
  {},
  async () => {
    try {
      const end = isoDaysAgo(1);
      // GSC search data lags ~2-3 days; start the window a little earlier.
      const start = isoDaysAgo(28);

      const [gscTotals, gscTopQueries, sitemaps] = await Promise.all([
        gscQuery({ startDate: start, endDate: end, dimensions: [], rowLimit: 1 }),
        gscQuery({ startDate: start, endDate: end, dimensions: ["query"], rowLimit: 10 }),
        gscSitemaps().catch((e) => ({ error: e?.message || String(e) })),
      ]);

      let ga4 = { skipped: "GA4_PROPERTY_ID not set" };
      if (GA4_PROPERTY) {
        const [totals, topPages, channels] = await Promise.all([
          ga4Report({
            startDate: "28daysAgo",
            endDate: "yesterday",
            metrics: ["activeUsers", "sessions", "engagementRate", "screenPageViews"],
          }),
          ga4Report({
            startDate: "28daysAgo",
            endDate: "yesterday",
            metrics: ["screenPageViews", "activeUsers"],
            dimensions: ["pagePath"],
            limit: 10,
          }),
          ga4Report({
            startDate: "28daysAgo",
            endDate: "yesterday",
            metrics: ["sessions"],
            dimensions: ["sessionDefaultChannelGroup"],
            limit: 10,
          }),
        ]);
        ga4 = {
          totals: flattenGa4(totals).rows[0] || {},
          topPages: flattenGa4(topPages).rows,
          channels: flattenGa4(channels).rows,
        };
      }

      return ok({
        site: SITE_URL,
        window: { start, end },
        searchConsole: {
          totals: gscTotals.rows?.[0] || { note: "no rows (data may still be processing)" },
          topQueries: gscTopQueries.rows || [],
        },
        analytics: ga4,
        sitemaps: sitemaps.sitemap || sitemaps,
      });
    } catch (e) {
      return fail(e);
    }
  }
);

server.tool(
  "gsc_search_analytics",
  "Query Search Console search analytics for the configured site. Dimensions: query, page, date, country, device, searchAppearance.",
  {
    startDate: z.string().describe("YYYY-MM-DD"),
    endDate: z.string().describe("YYYY-MM-DD"),
    dimensions: z.array(z.string()).optional().describe("e.g. ['query'] or ['page','device']"),
    rowLimit: z.number().int().positive().max(25000).optional(),
    searchType: z.enum(["web", "image", "video", "news", "discover", "googleNews"]).optional(),
  },
  async ({ startDate, endDate, dimensions, rowLimit, searchType }) => {
    try {
      return ok(await gscQuery({ startDate, endDate, dimensions, rowLimit, type: searchType }));
    } catch (e) {
      return fail(e);
    }
  }
);

server.tool(
  "gsc_sitemaps",
  "List submitted sitemaps for the configured site with download/error/warning status. Use to confirm a sitemap stays healthy after submission.",
  {},
  async () => {
    try {
      return ok(await gscSitemaps());
    } catch (e) {
      return fail(e);
    }
  }
);

server.tool(
  "gsc_inspect_url",
  "Inspect a single URL's index status in Search Console (coverage state, last crawl, canonical, verdict).",
  {
    url: z.string().url().describe("Full URL to inspect, e.g. https://www.lexylamparelli.cv/"),
  },
  async ({ url }) => {
    try {
      return ok(await gscInspect(url));
    } catch (e) {
      return fail(e);
    }
  }
);

server.tool(
  "ga4_run_report",
  "Run a GA4 Data API report against the configured property. Provide metrics (e.g. activeUsers, sessions, screenPageViews) and optional dimensions (e.g. pagePath, sessionDefaultChannelGroup, country). Dates accept GA4 keywords like '28daysAgo'/'yesterday' or YYYY-MM-DD.",
  {
    startDate: z.string(),
    endDate: z.string(),
    metrics: z.array(z.string()).min(1),
    dimensions: z.array(z.string()).optional(),
    limit: z.number().int().positive().max(100000).optional(),
  },
  async (args) => {
    try {
      return ok(flattenGa4(await ga4Report(args)));
    } catch (e) {
      return fail(e);
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error(
  `seo-health-mcp ready (site=${SITE_URL}, ga4=${GA4_PROPERTY || "unset"})`
);
