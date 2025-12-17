# BINGE (React + TypeScript + Vite)

A React rewrite of your movie recommendations app using TasteDive.

## Features
- Dark violet theme and left-aligned brand navbar
- Multi-seed homepage (up to ~60 items)
- Search with basic spelling correction
- Cards with hover overlays, overview, and optional YouTube embeds
- Robust TasteDive fetch via CORS proxy

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure API key (optional, uses a default demo key):

```bash
cp .env.example .env
# then edit .env to set VITE_TASTEDIVE_KEY
```

3. Run the dev server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm run preview
```

## Notes
- The app uses the AllOrigins proxy to avoid browser CORS errors.
- TasteDive limits results to 20 per call; the homepage aggregates across multiple seeds.
- Ratings/years aren’t provided by TasteDive, so they’re placeholder-only.