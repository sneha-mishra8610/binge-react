# BINGE (React + TypeScript + Vite)

https://binge-react.vercel.app/

- Created a web application using React.js with Vite.js.
- It uses the TasteDive's APIs to fetch the latest data.
- It is a responsive application with a search bar and and smooth transitions.

## Features
- Dark violet theme and left-aligned brand navbar
- Multi-seed homepage (up to ~60 items)
- Search with basic spelling correction
- Cards with hover overlays, overview, and optional YouTube embeds
- Robust TasteDive fetch via CORS proxy
npm run preview
```

## Notes
- The app uses the AllOrigins proxy to avoid browser CORS errors.
- TasteDive limits results to 20 per call; the homepage aggregates across multiple seeds.
- Ratings/years aren’t provided by TasteDive, so they’re placeholder-only.
