# SEO Health Monitoring (Search Console + GA4)

A read-only MCP server (`seo`) lets Claude/Codex pull Google Search Console and
GA4 data for this site directly, so "is the site healthy?" can be answered
without manual dashboard reading.

- Server: `scripts/seo-mcp/server.js` (launched by `scripts/seo-mcp.sh`)
- Site: Search Console domain property `sc-domain:lexylamparelli.cv`
- Analytics: GA4 (measurement id `G-41SSC36VTV` in `index.html`)
- Scopes are **read-only** — the server cannot modify GSC or GA4.

## One-time setup (Google consoles — must be done by the account owner)

The server cannot start until these exist.

1. **Google Cloud Console** → pick or create a project →
   **APIs & Services → Enable APIs** → enable both:
   - *Google Search Console API*
   - *Google Analytics Data API*
2. **Create a service account** (IAM & Admin → Service Accounts). No project
   roles needed. Create a **JSON key** and download it.
3. **Store the key outside the repo**, locked down:
   ```bash
   mkdir -p ~/.config/csolutions
   mv ~/Downloads/<key>.json ~/.config/csolutions/lexy-seo-sa.json
   chmod 600 ~/.config/csolutions/lexy-seo-sa.json
   ```
4. **Grant the service account access to the data** (copy its
   `client_email`, e.g. `name@project.iam.gserviceaccount.com`):
   - **Search Console** → property `lexylamparelli.cv` → Settings →
     *Users and permissions* → Add user → paste the email → Restricted (reader).
   - **GA4** → Admin → *Property Access Management* → Add → paste the email →
     **Viewer**. While there, open Admin → *Property Settings* and copy the
     **numeric Property ID** (e.g. `123456789`) — this is what `GA4_PROPERTY_ID`
     needs, **not** the `G-41SSC36VTV` measurement id.
5. **Configure the repo.** Copy `.env.ai.example` to `.env.ai.local` (gitignored)
   and fill in:
   ```
   GSC_GA_SA_KEYFILE=/home/cresp3/.config/csolutions/lexy-seo-sa.json
   GSC_SITE_URL=sc-domain:lexylamparelli.cv
   GA4_PROPERTY_ID=123456789
   ```

## Verify

```bash
# Should print "seo-health-mcp ready ..." and then block on stdio. Ctrl-C to exit.
bash scripts/seo-mcp.sh
```

Then in an interactive `claude` session, approve the new `seo` MCP server when
prompted (same trust gate as the other project servers), and ask for an
SEO health check.

## Tools

| Tool | What it does |
|------|--------------|
| `seo_health_overview` | One-shot snapshot: GA4 traffic + GSC performance + top queries + sitemap status (last 28 days). Start here. |
| `gsc_search_analytics` | Custom GSC query by date range and dimensions (query, page, date, country, device). |
| `gsc_sitemaps` | Submitted sitemaps with download/error/warning status. |
| `gsc_inspect_url` | Index status for one URL (coverage, last crawl, canonical, verdict). |
| `ga4_run_report` | Arbitrary GA4 Data API report (metrics + dimensions + date range). |

## Notes

- GSC search-analytics data lags ~2–3 days; very recent days return no rows.
- A freshly submitted sitemap can show "Pending" briefly before "Success".
- The service is read-only by design. To add another client site, point the
  three env vars at that site's property/key — the server is site-agnostic.
