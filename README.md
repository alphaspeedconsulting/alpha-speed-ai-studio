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

This site includes a quick internal traffic dashboard at:

- `/production-fix` (alias: `/traffic`)

It tracks page views and lead CTA events locally in-browser for fast validation.
To also forward events to GA4, set this environment variable:

```sh
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

With UTM-tagged links, source/medium/campaign metrics will appear in the dashboard table.

## Deployment

Deployed to GitHub Pages via the production build:

```sh
npm run build
```
