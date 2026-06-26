# Synapse — AI-Powered Data Automation Platform

> Built for the hackathon submission · React + Vite + Tailwind CSS

## 🚀 Live Demo
<!-- Replace with your Vercel URL after deploy -->
**Live:** [https://synapse-landing.vercel.app](https://synapse-landing.vercel.app)

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Motion | Native CSS Transitions + Web Animations API (WAAPI) |
| Pricing Logic | Vanilla JS island (zero React re-renders on toggle) |
| Fonts | Inter + JetBrains Mono (hackathon-specified) |
| Icons | Provided SVG asset pack |

## 🎯 Key Features Implemented

### Phase 3 — Pricing Matrix + Currency Switcher (Vanilla JS Island)
- Mounted via `useEffect` into a ref'd container — fully outside React's render tree
- Multi-dimensional config: `{ tier, baseRate, billingCycle, currency }` → computed price
- 20% annual discount × regional tariff (USD / EUR / GBP / INR)
- Zero hardcoded display values — all computed from config object
- Toggle logic uses only `addEventListener` + direct `textContent` writes
- Enterprise tier always shows "Contact Sales" regardless of billing/currency toggle

### Phase 4 — Bento ↔ Accordion + Context Lock
- Desktop (≥768px): CSS Grid bento — 4 tiles in a 3-column layout
- Mobile (<768px): Accordion with single open panel
- `matchMedia` listener carries `activeIndex` across breakpoint crossings
- All motion: native CSS `max-height` transitions + WAAPI — **zero animation libraries**
- Confirmed: no Framer Motion, Radix, HeadlessUI, react-spring in bundle

### Bento Feature Tiles
1. **Smart Ingestion** — Connects to 200+ sources and auto-normalizes formats on arrival
2. **Neural Agents** — Autonomous agents monitor data quality and fix anomalies in real time
3. **Reflex Rules** — Visual rule-builder triggers actions without writing a single script
4. **Live Pulse** — Real-time dashboards track every pipeline's health and throughput

### SEO
- Title, description, OG, Twitter Card meta tags — all set to Synapse copy
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<blockquote>`, `<footer>`
- Every SVG/image has `alt` or `aria-label`

## 🏃 Run Locally

```bash
npm install
npm run dev
# → http://localhost:5173
```

## 🔨 Build

```bash
npm run build
# → dist/ folder ready for deployment
```

## 🎨 Colour Palette (Official Hackathon Assets)

| Name | Hex | Use |
|---|---|---|
| Oceanic Noir | `#172B36` | Surface / cards |
| Nocturnal Expedition | `#114C5A` | Primary teal |
| Forsythia | `#FFC801` | Primary accent (yellow) |
| Deep Saffron | `#FF9932` | Secondary accent (orange) |
| Arctic Powder | `#F1F6F4` | Text primary |
| Mystic Mint | `#D9E8E2` | Text secondary |

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky nav with scroll-aware glass blur
│   ├── Hero.jsx            # Hero with WAAPI parallax + animated SVG pipeline
│   ├── BentoFeatures.jsx   # Phase 4: Bento↔Accordion with matchMedia
│   ├── Pricing.jsx         # Phase 3: Vanilla JS island (currency/billing)
│   ├── SocialProof.jsx     # Stats grid
│   └── Footer.jsx          # Semantic footer
├── index.css               # Tailwind v4 @theme design system
└── main.jsx                # React 19 entry point
public/
└── svgs/                   # Hackathon-provided SVG asset pack
```

## 📊 Social Proof
- Trusted by 12,000+ teams
- 4.2M automated runs this month
- 99.98% pipeline uptime
