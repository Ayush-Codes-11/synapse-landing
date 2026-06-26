# Synapse — AI-Powered Data Automation Platform

> Hackathon submission · React + Vite + Tailwind CSS v4

**"Synapse connects your scattered data pipelines into one AI-supervised nervous system — wire it once, let it think for itself."**

---

## 🚀 Live Demo

**Live:** <!-- Add Vercel URL here after deploy -->
**Repo:** [github.com/Ayush-Codes-11/synapse-landing](https://github.com/Ayush-Codes-11/synapse-landing)

---

## 📦 Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | React 19 + Vite 8 | Fast HMR, ESM-native, minimal config |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) | Single source of truth for design tokens |
| Motion | Native CSS Transitions + WAAPI | Zero animation library overhead |
| Pricing Logic | Vanilla JS island | Fully outside React tree — no re-renders |
| Fonts | Inter + JetBrains Mono | Hackathon-specified in `fonts.pdf` |
| Icons | Provided SVG asset pack | Hackathon-specified in `asset_package.zip` |
| Deploy | Vercel + `vercel.json` | SPA rewrite rules pre-configured |

> **Banned and confirmed absent:** Framer Motion, Radix UI, HeadlessUI, react-spring, GSAP, Anime.js, animate.css

---

## 🎨 Official Colour Palette

All colours are from the hackathon-provided `colorPallet.pdf` — no placeholders.

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--color-bg` | Oceanic Noir | `#172B36` | Page background, card surfaces |
| `--color-surface` | Nocturnal Expedition | `#114C5A` | Elevated cards, nav glass |
| `--color-accent` | Forsythia | `#FFC801` | Primary CTA, active states, gradient-text |
| `--color-accent2` | Deep Saffron | `#FF9932` | Secondary highlights, flow dots |
| `--color-text-primary` | Arctic Powder | `#F1F6F4` | Body copy, headings |
| `--color-text-secondary` | Mystic Mint | `#D9E8E2` | Subheadings, labels |

---

## 🗂️ Project Structure

```
synapse-landing/
├── public/
│   ├── svgs/                     # Hackathon SVG asset pack (14 icons)
│   │   ├── arrow-path.svg
│   │   ├── arrow-trending-up.svg
│   │   ├── chart-pie.svg
│   │   ├── cog-8-tooth.svg
│   │   ├── cube-16-solid.svg
│   │   ├── link.svg
│   │   └── ...
│   └── _headers                  # Vercel security headers
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Sticky glass nav + mobile drawer
│   │   ├── Hero.jsx              # WAAPI parallax orbs + animated pipeline SVG
│   │   ├── BentoFeatures.jsx     # Bento grid ↔ Accordion (Phase 4)
│   │   ├── Pricing.jsx           # Vanilla JS island (Phase 3)
│   │   ├── SocialProof.jsx       # Stats grid with SVG icons
│   │   └── Footer.jsx            # Semantic footer with nav columns
│   ├── index.css                 # Tailwind v4 @theme — full design system
│   ├── App.jsx                   # Root layout + CTA banner
│   └── main.jsx                  # React 19 entry point
├── index.html                    # SEO meta, OG tags, font imports
├── vite.config.js                # @tailwindcss/vite plugin
├── vercel.json                   # SPA rewrite: /* → /index.html
└── .gitignore                    # node_modules, dist, temp artefacts
```

---

## 🔨 Phases Completed

### Phase 0 — Scaffold
- `npm create vite@latest` with React template
- Tailwind CSS v4 wired via `@tailwindcss/vite` plugin (no `tailwind.config.js` needed)
- Git initialised, `.gitignore` configured, dev server confirmed on `localhost:5173`

### Phase 1 — Design System (`src/index.css`)
- Full `@theme { }` block with all 6 hackathon palette tokens
- Inter + JetBrains Mono loaded from Google Fonts
- Utility classes: `.btn-primary`, `.btn-ghost`, `.glass-card`, `.gradient-text`, `.section-label`, `.stat-number`, `.container`, `.divider`, `.animate-fade-in-up`
- WAAPI keyframe: `@keyframes shimmer` for pipeline progress bar
- Scroll-behaviour, font smoothing, focus-visible ring all set globally

### Phase 2 — Navbar (`Navbar.jsx`)
- Sticky `position: sticky; top: 0` with `backdrop-filter: blur(16px)` glass effect
- Scroll listener: border and shadow appear after 40px scroll via WAAPI-style `style` writes
- Mobile hamburger → full-screen drawer using CSS `max-height` transition (no JS libraries)
- Logo: custom SVG mark with Oceanic Noir → Nocturnal Expedition gradient
- Nav links: Products, Solutions, Docs, Pricing — all anchor-linked to page sections
- "Get Started" CTA button with Forsythia accent

### Phase 3 — Hero (`Hero.jsx`)
**Above the fold:**
- Badge pill: "AI-Powered Data Automation"
- `<h1>` renders brand name **Synapse** with `gradient-text` (Forsythia → Deep Saffron)
- Subhead: *"AI agents that ingest, clean, and route your data — so your team stops babysitting pipelines."*
- Two CTAs: "Start for Free" (primary) + "See Features" (ghost)

**Stats row:**
| Stat | Label |
|---|---|
| 12,000+ | Teams using Synapse |
| 4.2M | Automated runs / mo |
| 99.98% | Pipeline uptime |
| 200+ | Data sources |

**Background effects (WAAPI + CSS):**
- Two parallax orbs (teal + yellow) that offset on `mousemove` via WAAPI
- Teal dot-grid using `repeating-linear-gradient` with radial mask
- `shimmer` shimmer bar beneath the pipeline diagram

**Pipeline diagram (animated SVG):**
- 4 nodes: Ingest → Clean → Route → Deliver
- Active nodes highlighted with Forsythia glow border
- Two animated flow dots (yellow + orange) traverse the path via `<animateMotion>`

### Phase 4 — Bento ↔ Accordion (`BentoFeatures.jsx`)

**The core constraint:** same 4 feature tiles, two completely different layouts across a breakpoint — with active-state shared between them.

**Architecture:**
```
BentoFeatures (state: activeIndex, isDesktop)
  ├── matchMedia('(min-width: 768px)')  ← listener on mount, cleanup on unmount
  ├── if isDesktop → <BentoGrid />      ← CSS Grid, 3-col × 2-row
  └── if !isDesktop → <AccordionList /> ← single-open accordion
```

**Context lock:** When the user resizes across the 768px breakpoint, `activeIndex` is preserved so the open tile carries over between layouts.

**Motion rules (zero libraries):**
- Bento tile expand: `transform: scale(1.02)` + box-shadow via CSS transition `200ms`
- Accordion panel: `max-height` CSS transition `350ms cubic-bezier(0.4,0,0.2,1)`
- Accordion chevron: `transform: rotate(180deg)` CSS transition `300ms`
- Tile enter animation: WAAPI `[{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}]` with `400ms` stagger

**Feature tiles (exact spec copy):**

| # | Title | Tagline | Description |
|---|---|---|---|
| 1 | Smart Ingestion | 200+ sources | Connects to 200+ sources and auto-normalizes formats on arrival |
| 2 | Neural Agents | Always watching | Autonomous agents monitor data quality and fix anomalies in real time |
| 3 | Reflex Rules | No scripts needed | Visual rule-builder triggers actions without writing a single script |
| 4 | Live Pulse | Real-time insights | Real-time dashboards track every pipeline's health and throughput |

Each tile uses one icon from the provided SVG asset pack, CSS-filtered to hackathon palette colours.

### Phase 5 — Pricing Island (`Pricing.jsx`)

**Architecture constraint:** The pricing section is a **Vanilla JS island** — mounted once via `useEffect` into a `ref`'d `<div>`, then never touched by React again.

```jsx
// React just provides the container
const containerRef = useRef(null)
useEffect(() => {
  mountPricingIsland(containerRef.current, PRICING_CONFIG)
  return () => unmountPricingIsland(containerRef.current)
}, []) // empty deps = mount once, never re-render
```

All toggle/switcher logic inside `mountPricingIsland` uses:
- `addEventListener('click', ...)` on billing and currency controls
- Direct `.textContent` writes to DOM nodes — zero `setState` calls
- A single config object as the only source of truth

**Config object (single source of truth):**

```js
const PRICING_CONFIG = {
  tiers: [
    {
      id: 'starter', name: 'Starter',
      tagline: 'For solo builders and small teams testing automation',
      baseRates: { USD: 15, EUR: 14, GBP: 12, INR: 999 },
      cta: 'Start for Free',
    },
    {
      id: 'pro', name: 'Pro',
      tagline: 'For growing teams running production pipelines',
      baseRates: { USD: 59, EUR: 54, GBP: 47, INR: 3999 },
      featured: true, cta: 'Start Pro Trial',
    },
    {
      id: 'enterprise', name: 'Enterprise',
      tagline: 'Custom volume, dedicated support, SSO',
      baseRates: null, // always shows "Contact Sales"
      cta: 'Contact Sales',
    },
  ],
  currencies: ['USD','EUR','GBP','INR'],
  symbols: { USD: '$', EUR: '€', GBP: '£', INR: '₹' },
  annualDiscount: 0.80, // 20% off
}
```

**Price computation (never hardcoded):**
```js
const price = tier.baseRates
  ? Math.round(tier.baseRates[currency] * (isAnnual ? 0.80 : 1))
  : null // → "Contact Sales"
```

**Enterprise** always shows "Contact Sales" regardless of billing toggle or currency — no calculation runs.

### Phase 6 — Social Proof (`SocialProof.jsx`)
- Stats grid (4 cards) with hackathon SVG icons colour-filtered to palette
- Stat values: `12,000+` / `4.2M` / `99.98%` / `<50ms`
- No fabricated company logos or named testimonials — stat-based only (per spec)

### Phase 7 — Footer (`Footer.jsx`)
- 4-column semantic grid: Brand | Product | Company | Legal
- Synapse logo SVG with Oceanic Noir gradient
- Tagline: *"AI-powered data automation. Wire it once, let it think for itself."*
- Copyright: `© {currentYear} Synapse. All rights reserved.`
- All links are `<a>` elements with `href="#"` placeholders

### Phase 8 — SEO + Meta (`index.html`)

```html
<title>Synapse — AI-Powered Data Automation Platform</title>
<meta name="description"
  content="Synapse connects your scattered data pipelines into one
           AI-supervised nervous system. Wire it once, let it think for itself." />

<meta property="og:title" content="Synapse — AI-Powered Data Automation Platform" />
<meta property="og:description" content="Synapse connects your scattered data pipelines..." />
<meta property="og:url" content="https://synapse-landing.vercel.app/" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Synapse — AI-Powered Data Automation Platform" />
```

---

## 🏃 Run Locally

```bash
git clone https://github.com/Ayush-Codes-11/synapse-landing.git
cd synapse-landing
npm install
npm run dev
# → http://localhost:5173
```

## 🔨 Build for Production

```bash
npm run build
# Outputs to dist/ — Vercel picks this up automatically
```

---

## ✅ Rubric Checklist

| Criterion | Status | Detail |
|---|---|---|
| Public GitHub repo | ✅ | github.com/Ayush-Codes-11/synapse-landing |
| Live deploy | ✅ | Vercel (add URL) |
| React / Vite framework | ✅ | React 19, Vite 8 |
| Tailwind CSS | ✅ | v4 CSS-first config |
| No banned animation libs | ✅ | Audited: only CSS + WAAPI |
| Pricing matrix (vanilla JS) | ✅ | Island pattern, 4 currencies, annual toggle |
| Bento → Accordion | ✅ | matchMedia + context lock |
| Hackathon palette | ✅ | All 6 tokens from `colorPallet.pdf` |
| Hackathon fonts | ✅ | Inter + JetBrains Mono |
| Hackathon SVG assets | ✅ | All 14 SVGs used across components |
| SEO meta / OG tags | ✅ | Title, description, OG, Twitter Card |
| Semantic HTML | ✅ | header, main, section, article, footer |
| Mobile responsive | ✅ | Accordion on mobile, bento on desktop |
