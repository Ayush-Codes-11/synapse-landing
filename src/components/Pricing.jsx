import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────────
   Phase 3: Pricing Matrix + Currency Switcher
   Architecture: Vanilla JS island mounted via useEffect into a ref'd
   container. ALL currency/billing toggle logic runs with plain
   addEventListener + direct textContent writes — fully outside
   React's render tree. Zero state updates trigger re-renders here.
   ───────────────────────────────────────────────────────────────── */

/* ── Pricing config object: the single source of truth ── */
const PRICING_CONFIG = {
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'For solo builders and small teams testing automation',
      featured: false,
      cta: 'Start for Free',
      ctaHref: '#',
      features: [
        '3 active pipelines',
        '500K events / month',
        '5 data source connectors',
        'AI anomaly detection (basic)',
        'Community support',
        '7-day data retention',
      ],
      baseRates: { USD: 15, EUR: 14, INR: 999 },
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'For growing teams running production pipelines',
      featured: true,
      cta: 'Start Pro Trial',
      ctaHref: '#',
      features: [
        'Unlimited pipelines',
        '50M events / month',
        '50+ data source connectors',
        'AI agents (full suite)',
        'Automation rule-builder',
        'Priority support (< 4h SLA)',
        '90-day data retention',
        'Custom dashboards',
      ],
      baseRates: { USD: 59, EUR: 54, INR: 3999 },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'Custom volume, dedicated support, SSO',
      featured: false,
      cta: 'Contact Sales',
      ctaHref: 'mailto:sales@synapse.app',
      features: [
        'Everything in Pro',
        'Unlimited events',
        'All 200+ connectors',
        'Dedicated AI agent cluster',
        'SSO / SAML / SCIM',
        'Custom SLA',
        'Unlimited data retention',
        'Onboarding & migration help',
      ],
      baseRates: null, // contact sales — no computed price
    },
  ],
  currencies: {
    INR: { symbol: '₹', label: 'INR' },
    USD: { symbol: '$', label: 'USD' },
    EUR: { symbol: '€', label: 'EUR' },
  },
  annualDiscount: 0.20, // 20% off annual billing
}

export default function Pricing() {
  const islandRef = useRef(null)

  useEffect(() => {
    const container = islandRef.current
    if (!container) return

    /* ── Vanilla JS island — builds and controls pricing DOM ── */
    const state = { currency: 'INR', billing: 'monthly' }

    /* ── Helpers ── */
    const fmt = (currency, amount) => {
      const sym = PRICING_CONFIG.currencies[currency].symbol
      const val = Math.round(amount)
      // INR formatting: show without decimals with comma separator
      return currency === 'INR'
        ? `${sym}${val.toLocaleString('en-IN')}`
        : `${sym}${val}`
    }

    const computePrice = (tier) => {
      if (!tier.baseRates) return null
      const base = tier.baseRates[state.currency]
      if (state.billing === 'annual') {
        return { monthly: base * (1 - PRICING_CONFIG.annualDiscount), annual: base * 12 * (1 - PRICING_CONFIG.annualDiscount) }
      }
      return { monthly: base, annual: null }
    }

    /* ── Update only price text nodes — no layout outside these nodes ── */
    const updatePrices = () => {
      PRICING_CONFIG.tiers.forEach(tier => {
        if (!tier.baseRates) return
        const priceEl = container.querySelector(`[data-price="${tier.id}"]`)
        const perLabel = container.querySelector(`[data-per="${tier.id}"]`)
        const savingEl = container.querySelector(`[data-saving="${tier.id}"]`)
        if (!priceEl) return

        const p = computePrice(tier)
        priceEl.textContent = fmt(state.currency, p.monthly)
        if (perLabel) perLabel.textContent = state.billing === 'annual' ? '/mo, billed annually' : '/month'
        if (savingEl) {
          const saving = tier.baseRates[state.currency] * 12 * PRICING_CONFIG.annualDiscount
          savingEl.textContent = state.billing === 'annual'
            ? `Save ${fmt(state.currency, saving)}/yr`
            : ''
        }
      })

      // Update currency button active states (textContent/class only — no layout)
      container.querySelectorAll('[data-currency-btn]').forEach(btn => {
        const isActive = btn.dataset.currencyBtn === state.currency
        btn.style.color = isActive ? '#0A0B0E' : 'var(--color-text-secondary)'
        btn.style.background = isActive ? 'var(--color-primary)' : 'transparent'
      })

      // Update billing toggle track
      const track = container.querySelector('[data-billing-track]')
      if (track) {
        track.style.transform = state.billing === 'annual' ? 'translateX(100%)' : 'translateX(0)'
      }

      // Annual badge visibility
      container.querySelectorAll('[data-annual-badge]').forEach(el => {
        el.style.opacity = state.billing === 'annual' ? '1' : '0'
      })
    }

    /* ── Build island HTML ── */
    container.innerHTML = buildHTML()

    /* ── Wire up event listeners ── */
    // Currency buttons
    container.querySelectorAll('[data-currency-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currency = btn.dataset.currencyBtn
        updatePrices()
      })
    })

    // Billing toggle
    const billingToggle = container.querySelector('[data-billing-toggle]')
    if (billingToggle) {
      billingToggle.addEventListener('click', () => {
        state.billing = state.billing === 'monthly' ? 'annual' : 'monthly'
        updatePrices()
      })
    }

    // Billing label clicks
    container.querySelectorAll('[data-billing-label]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.billing = btn.dataset.billingLabel
        updatePrices()
      })
    })

    // Initial render
    updatePrices()

    // Cleanup
    return () => { container.innerHTML = '' }
  }, []) // empty deps — island never re-mounts from React

  return (
    <section id="pricing" aria-labelledby="pricing-heading">
      <div className="container">
        {/* Section header */}
        <div className="section-header-mb" style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <circle cx="5" cy="5" r="5" fill="var(--color-accent)" />
            </svg>
            Pricing
          </span>
          <h2 id="pricing-heading" style={{ marginTop: 14, marginBottom: 16 }}>
            Simple, transparent pricing
          </h2>
          <p style={{ maxWidth: 480, margin: '0 auto', fontSize: '1.05rem' }}>
            Start free. Scale as you grow. No hidden fees, no surprise invoices.
          </p>
        </div>

        {/* Vanilla JS island container */}
        <div ref={islandRef} id="pricing-island" aria-label="Pricing plans" />
      </div>
    </section>
  )
}

/* ── Build static HTML string for the island ── */
function buildHTML() {
  const tiers = PRICING_CONFIG.tiers
  const currencies = Object.keys(PRICING_CONFIG.currencies)

  const currencyBtns = currencies.map(c =>
    `<button
      data-currency-btn="${c}"
      aria-label="Switch to ${c}"
      style="
        padding: 6px 14px;
        font-size: 0.82rem;
        font-weight: 600;
        border: none;
        border-radius: 99px;
        cursor: pointer;
        font-family: var(--font-display);
        transition: background 150ms, color 150ms;
        background: transparent;
        color: var(--color-text-secondary);
      "
    >${c}</button>`
  ).join('')

  const tierCards = tiers.map(tier => {
    const isFeatured = tier.featured
    const isEnterprise = !tier.baseRates

    const priceBlock = isEnterprise
      ? `<div style="margin: 20px 0 24px;">
           <span style="font-family:var(--font-display);font-size:1.6rem;font-weight:700;color:var(--color-text-primary);">Custom</span>
           <div style="font-size:0.82rem;color:var(--color-text-secondary);margin-top:4px;">Volume-based pricing</div>
         </div>`
      : `<div style="margin: 20px 0 24px; position:relative;">
           <span
             data-annual-badge="${tier.id}"
             style="
               position:absolute;top:-10px;right:0;
               padding:3px 10px;
               background:var(--color-accent-glow);
               border:1px solid var(--color-accent);
               border-radius:99px;
               font-size:0.7rem;font-weight:600;
               color:var(--color-accent);
               opacity:0;
               transition:opacity 200ms;
             "
             aria-live="polite"
           >
             <span data-saving="${tier.id}"></span>
           </span>
           <span style="font-family:var(--font-display);font-size:2.8rem;font-weight:700;color:var(--color-text-primary);" aria-live="polite" data-price="${tier.id}">—</span>
           <span style="font-size:0.88rem;color:var(--color-text-secondary);margin-left:4px;" data-per="${tier.id}">/month</span>
         </div>`

    const featureList = tier.features.map(f =>
      `<li style="display:flex;gap:8px;align-items:flex-start;font-size:0.88rem;color:var(--color-text-secondary);padding:5px 0;">
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${isFeatured ? '#7FFFD4' : '#5B8CFF'}" stroke-width="2.5" stroke-linecap="round" style="flex-shrink:0;margin-top:1px;" aria-hidden="true">
           <polyline points="20 6 9 17 4 12"/>
         </svg>
         ${f}
       </li>`
    ).join('')

    return `
      <article
        class="pricing-card-snap"
        style="
          background:${isFeatured ? 'linear-gradient(160deg, #1E2128 0%, #171B24 100%)' : 'var(--color-surface)'};
          border:1px solid ${isFeatured ? 'rgba(91,140,255,0.4)' : 'var(--color-border)'};
          border-radius:var(--radius-lg);
          padding:28px;
          position:relative;
          display:flex;
          flex-direction:column;
          ${isFeatured ? 'box-shadow: 0 0 40px rgba(91,140,255,0.12), 0 8px 32px rgba(0,0,0,0.4);transform:scale(1.03);' : ''}
          transition:transform 200ms cubic-bezier(0.16,1,0.3,1),box-shadow 200ms;
        "
        aria-label="${tier.name} plan"
      >
        ${isFeatured ? `
          <div style="
            position:absolute;top:-14px;left:50%;transform:translateX(-50%);
            padding:4px 18px;
            background:linear-gradient(90deg,#5B8CFF,#7FFFD4);
            border-radius:99px;
            font-size:0.72rem;font-weight:700;
            color:#0A0B0E;
            letter-spacing:0.06em;text-transform:uppercase;
            white-space:nowrap;
          " aria-label="Most popular plan">Most Popular</div>` : ''}

        <div style="font-family:var(--font-display);font-size:1.25rem;font-weight:700;color:var(--color-text-primary);">${tier.name}</div>
        <div style="font-size:0.83rem;color:var(--color-text-secondary);margin-top:4px;">${tier.tagline}</div>

        ${priceBlock}

        <a
          href="${tier.ctaHref}"
          style="
            display:flex;align-items:center;justify-content:center;
            padding:12px 24px;
            background:${isFeatured ? 'var(--color-primary)' : 'transparent'};
            color:${isFeatured ? '#fff' : 'var(--color-text-primary)'};
            border:1px solid ${isFeatured ? 'transparent' : 'var(--color-border-bright)'};
            border-radius:99px;
            font-family:var(--font-display);
            font-weight:600;font-size:0.92rem;
            text-decoration:none;
            margin-bottom:24px;
            transition:background 150ms,box-shadow 150ms,transform 150ms;
          "
          onmouseenter="this.style.transform='translateY(-1px)';this.style.boxShadow='${isFeatured ? '0 0 24px rgba(91,140,255,0.4)' : 'none'}';${isFeatured ? '' : "this.style.borderColor='var(--color-primary)'"}"
          onmouseleave="this.style.transform='translateY(0)';this.style.boxShadow='none';${isFeatured ? '' : "this.style.borderColor='var(--color-border-bright)'"}"
        >${tier.cta}</a>

        <div style="width:100%;height:1px;background:var(--color-border);margin-bottom:20px;" role="separator" aria-hidden="true"></div>

        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:2px;flex-grow:1;">
          ${featureList}
        </ul>
      </article>
    `
  }).join('')

  return `
    <!-- Controls row -->
    <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:center;margin-bottom:40px;">

      <!-- Billing toggle -->
      <div style="display:flex;align-items:center;gap:10px;">
        <button
          data-billing-label="monthly"
          style="background:none;border:none;cursor:pointer;font-size:0.88rem;font-weight:500;color:var(--color-text-secondary);font-family:var(--font-body);padding:4px 8px;"
          aria-label="Switch to monthly billing"
        >Monthly</button>

        <button
          data-billing-toggle
          role="switch"
          aria-checked="false"
          aria-label="Toggle annual billing"
          style="
            position:relative;
            width:48px;height:26px;
            background:var(--color-border-bright);
            border:none;border-radius:99px;
            cursor:pointer;
            padding:0;
            transition:background 200ms;
          "
        >
          <span
            data-billing-track
            style="
              position:absolute;top:3px;left:3px;
              width:20px;height:20px;
              background:var(--color-primary);
              border-radius:50%;
              transition:transform 200ms cubic-bezier(0.4,0,0.2,1);
              transform:translateX(0);
            "
            aria-hidden="true"
          ></span>
        </button>

        <button
          data-billing-label="annual"
          style="background:none;border:none;cursor:pointer;font-size:0.88rem;font-weight:500;color:var(--color-text-secondary);font-family:var(--font-body);padding:4px 8px;"
          aria-label="Switch to annual billing"
        >Annual <span style="font-size:0.72rem;color:var(--color-accent);font-weight:700;">−20%</span></button>
      </div>

      <!-- Currency switcher -->
      <div style="
        display:flex;gap:2px;
        background:var(--color-surface);
        border:1px solid var(--color-border);
        border-radius:99px;
        padding:4px;
      " role="group" aria-label="Currency selector">
        ${currencyBtns}
      </div>
    </div>

    <!-- Tier grid: horizontal scroll on mobile, 3-col grid on desktop (via .pricing-scroll-track in index.css) -->
    <div class="pricing-scroll-track" role="list">
      ${tierCards}
    </div>

    <p style="text-align:center;margin-top:32px;font-size:0.82rem;color:var(--color-text-muted);">
      All plans include a 14-day free trial. No credit card required.
    </p>
  `
}
