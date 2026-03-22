# Lexy Lamparelli Portfolio Website

Custom React + Vite portfolio site for **Alexia “Lexy” Lamparelli**, built to showcase Canva design work, social media content, professional experience, and contact information in a polished editorial-style single-page experience.

## Project Links

- **Live site:** https://lexy-lamparelli-portfolio.vercel.app/
- **GitHub repository:** https://github.com/Crespo1301/Lexy-Lamparelli-Portfolio
- **Reference inspiration noted during design exploration:** https://skysocietyresource.com/portfolio-christine

## Project Stack

- React
- Vite
- CSS split by concern into shared style files
- Vercel deployment
- GitHub version control

## Content Summary

### Profile
- **Name:** Alexia Lamparelli
- **Title:** Microinfluencer / Content Creator
- **Location:** Boston, MA
- **Email:** lexylamps222@gmail.com

### Niche
- Lifestyle
- Fashion
- Fitness
- Skincare
- Hair care

### Social Links
- **TikTok:** https://www.tiktok.com/@lexylamparelli?_r=1&_t=ZT-94ssaRIAGYY
- **Instagram:** https://www.instagram.com/lexylamps?igsh=MW00OTR6NG82b2RhOA%3D%3D&utm_source=qr
- **Pinterest:** https://pin.it/4b6npcTB5

### Highlighted TikTok Links
- https://www.tiktok.com/t/ZTkJDyxog/
- https://www.tiktok.com/t/ZTkJD6KHf/
- https://www.tiktok.com/t/ZTkJDYCTR/
- https://www.tiktok.com/t/ZTkJD2yep/
- https://www.tiktok.com/t/ZTkJDd4D7/
- https://www.tiktok.com/t/ZTkJDAeyN/
- https://www.tiktok.com/t/ZTkJDMk1M/
- https://www.tiktok.com/t/ZTkJDDe2V/
- https://www.tiktok.com/t/ZTkJDFDtN/

## Brand / Visual Direction

### Visual Positioning
The site is designed to feel:
- editorial
- feminine
- modern
- warm
- polished
- portfolio-forward

### Primary Brand Color
Current project styles are centered around a deep warm red and cream palette.

Suggested working brand tokens based on the current build:
- **Primary red:** `#B00F06`
- **Cream background:** `#FFF6F3`
- **Dark text:** `#241713`

> Final production colors should always match the values defined in `src/styles/tokens.css`.

### Logos / Brand Assets in Use
The project currently uses image assets placed in the repo for:
- profile portrait
- work directory thumbnails
- Canva gallery previews
- social thumbnails
- brand/logo graphics in static asset folders

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment
This project is deployed through Vercel from GitHub. Pushing to the configured branch triggers a new deployment.

## Asset Pathing Note
For deployed images, use static public paths such as:

```js
image: '/assets/Canva/canva-work-9.png'
```

Do **not** use runtime URLs that begin with `/src/...` for deployed static images.

## Project Structure

```text
src/
  components/
  data/
  styles/
  App.jsx
  main.jsx

public/
  assets/
    Canva/
    TikTok/
    brand-logo/
```

## Design and IP / Reference Note

This project was built as an original coded portfolio implementation for a client-facing personal brand site. A reference site was reviewed during visual exploration, but the final implementation should remain based on:
- original copy
- original code
- original layout decisions
- licensed, owned, or authorized images/assets only

### Important Copyright / Fair Use Notes
This section is a practical project note, not legal advice.

- Copyright generally protects **original expression**, not general ideas, themes, systems, or methods.
- Website copy, photos, artwork, and other original creative assets can be protected.
- “Fair use” is **case-specific** and is not guaranteed just because a project is inspired by another design.
- Using another site for broad inspiration is different from copying its exact text, graphics, source code, or distinctive protected assets.
- To reduce risk, this project should avoid reusing any third-party protected copy, images, logos, or code unless permission or a license exists.
- If there is ever concern about similarity, the safest path is to further differentiate layout details, copy, assets, and interactions, or consult a licensed attorney.

## Final Production Checklist

- Confirm all image paths resolve correctly on Vercel
- Replace any remaining placeholder descriptions
- Replace any temporary placeholder images
- Confirm mobile spacing across all sections
- Verify all Canva/TikTok/Instagram links
- Confirm final asset ownership or permission status
- Run a final Lighthouse/performance pass before handoff

## Status
Ready for final polish and deployment review.
