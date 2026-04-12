# αlphaspeed AI Studio

One flexible AI platform that automates lead follow-up, scheduling, customer chat, and more for small businesses.

**Live site:** https://alphaspeedconsulting.github.io/alpha-speed-ai-studio/

## Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Development

Requires Node.js & npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# Install dependencies
npm i

# Start development server
npm run dev
```

## Traffic Tracking

The traffic dashboard at **`/traffic`** shows launch metrics (page views, leads, source/campaign).

- **Browser-only:** If you don’t configure a backend, the dashboard shows only this device’s activity (localStorage).
- **Site-wide (all visitors):** Use Supabase so every visitor’s events are stored and the dashboard shows real site-wide traffic.

### Site-wide setup (Supabase)

1. Create a project at [supabase.com](https://supabase.com).
2. In the dashboard, open **SQL Editor** and run the contents of `supabase/migrations/001_analytics_events.sql`.
3. In **Settings → API** copy the project URL and the `anon` public key.
4. Add to your env (e.g. `.env` or your host’s config):

```sh
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

If deploying with GitHub Pages Actions, add the same keys as repository secrets:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_GA_MEASUREMENT_ID` (optional)

Rebuild and deploy. The `/traffic` dashboard will then show site-wide data.

### Optional: Google Analytics 4

To also send events to GA4, set:

```sh
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Use UTM parameters on campaign links (`utm_source`, `utm_medium`, `utm_campaign`) so source/campaign breakdown is accurate.

### Weekly SEO / Content Review Loop

Review these once per week after content or SEO changes ship:

1. Check Google Search Console for:
   - indexed page count trend
   - newly discovered or newly excluded URLs
   - any redirected or `Crawled - currently not indexed` URLs tied to recent pages
2. Check `/traffic` and GA4 for:
   - organic landing pages gaining sessions
   - homepage-to-content clicks
   - blog-to-case-study / ROI click paths
   - booking/contact conversions from landing pages
3. Compare the top-performing entry pages against CTA performance:
   - keep expanding topics that earn both traffic and downstream clicks
   - improve internal links or offers on pages that earn traffic but weak conversion engagement
4. Turn the next content sprint into one of:
   - another post supporting a page already getting impressions
   - a stronger CTA path for a page with traffic but weak assists
   - a new vertical/local page if Search Console shows adjacent demand

Recommended tracked surfaces added in this repo:
- Homepage discovery cards
- Blog CTA links to ROI, case studies, and landing pages
- Landing-page resource links to case studies, ROI, and supporting blog posts
- Calendly/contact placements with page-specific `placement` metadata

## Deployment

Deployed to GitHub Pages via the production build:

```sh
npm run build
```
