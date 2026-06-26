import { useState, useEffect, useRef, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────────
   Phase 4: Bento ↔ Accordion with context lock
   Desktop  → CSS Grid bento (4 tiles)
   Mobile   → Accordion (single open panel, carries activeIndex across)
   Motion   → native CSS transitions + WAAPI only — zero animation libs
   ───────────────────────────────────────────────────────────────── */

const FEATURES = [
  {
    id: 'ingestion',
    icon: (
      <img src="/svgs/arrow-path.svg" width="28" height="28" alt="" aria-hidden="true"
        style={{ filter: 'brightness(0) saturate(100%) invert(79%) sepia(49%) saturate(500%) hue-rotate(358deg) brightness(105%)' }}
      />
    ),
    title: 'Smart Ingestion',
    tagline: '200+ sources',
    description:
      'Connects to 200+ sources and auto-normalizes formats on arrival.',
    detail: [
      'Auto-schema detection across JSON, CSV, Parquet, Avro',
      'Native connectors for Postgres, BigQuery, Snowflake, S3',
      'Real-time CDC with sub-second latency',
    ],
    accent: '#FFC801',
    glow: 'rgba(255,200,1,0.12)',
    span: { col: '1 / 2', row: '1 / 3' },
  },
  {
    id: 'agents',
    icon: (
      <img src="/svgs/cog-8-tooth.svg" width="28" height="28" alt="" aria-hidden="true"
        style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(79%) saturate(383%) hue-rotate(349deg) brightness(103%)' }}
      />
    ),
    title: 'Neural Agents',
    tagline: 'Always watching',
    description:
      'Autonomous agents monitor data quality and fix anomalies in real time.',
    detail: [
      'LLM-powered anomaly detection with < 0.1% false-positive rate',
      'Root-cause analysis with automated remediation suggestions',
      'Slack / PagerDuty alerting with full context',
    ],
    accent: '#FF9932',
    glow: 'rgba(255,153,50,0.12)',
    span: { col: '2 / 3', row: '1 / 2' },
  },
  {
    id: 'automation',
    icon: (
      <img src="/svgs/link.svg" width="28" height="28" alt="" aria-hidden="true"
        style={{ filter: 'brightness(0) saturate(100%) invert(86%) sepia(16%) saturate(284%) hue-rotate(92deg) brightness(101%)' }}
      />
    ),
    title: 'Reflex Rules',
    tagline: 'No scripts needed',
    description:
      'Visual rule-builder triggers actions without writing a single script.',
    detail: [
      'Drag-and-drop rule composer with 80+ pre-built templates',
      'Conditional branching, loops, and rollback support',
      'Version-controlled rule history with 1-click restore',
    ],
    accent: '#D9E8E2',
    glow: 'rgba(217,232,226,0.1)',
    span: { col: '2 / 3', row: '2 / 3' },
  },
  {
    id: 'analytics',
    icon: (
      <img src="/svgs/arrow-trending-up.svg" width="28" height="28" alt="" aria-hidden="true"
        style={{ filter: 'brightness(0) saturate(100%) invert(79%) sepia(49%) saturate(500%) hue-rotate(358deg) brightness(105%)' }}
      />
    ),
    title: 'Live Pulse',
    tagline: 'Real-time insights',
    description:
      'Real-time dashboards track every pipeline’s health and throughput.',
    detail: [
      'Sub-second dashboard refresh with WebSocket streaming',
      'Custom KPI widgets with threshold alerting',
      'RBAC-gated views per team and project',
    ],
    accent: '#FFC801',
    glow: 'rgba(255,200,1,0.12)',
    span: { col: '3 / 4', row: '1 / 3' },
  },
]

const DESKTOP_BREAKPOINT = 768

export default function BentoFeatures() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= DESKTOP_BREAKPOINT : true
  )
  const mediaRef = useRef(null)

  // matchMedia listener — carries activeIndex across breakpoint crossing
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    mediaRef.current = mq
    const onChange = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const handleActivate = useCallback((idx) => {
    setActiveIndex(idx)
  }, [])

  return (
    <section id="features" aria-labelledby="features-heading">
      <div className="container">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <circle cx="5" cy="5" r="5" fill="var(--color-primary)" />
            </svg>
            Platform Features
          </span>
          <h2 id="features-heading" style={{ marginTop: 14, marginBottom: 16 }}>
            Everything your data team needs
          </h2>
          <p style={{ maxWidth: 540, margin: '0 auto', fontSize: '1.05rem' }}>
            A unified platform that replaces the patchwork of glue-code scripts keeping your pipelines alive.
          </p>
        </div>

        {/* Conditional render: Bento on desktop, Accordion on mobile */}
        {isDesktop
          ? <BentoGrid features={FEATURES} activeIndex={activeIndex} onActivate={handleActivate} />
          : <AccordionList features={FEATURES} activeIndex={activeIndex} onActivate={handleActivate} />
        }
      </div>
    </section>
  )
}

/* ── Desktop: CSS Grid Bento ── */
function BentoGrid({ features, activeIndex, onActivate }) {
  return (
    <div
      role="region"
      aria-label="Feature tiles"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 260px)',
        gap: 16,
      }}
    >
      {features.map((feat, i) => (
        <BentoTile
          key={feat.id}
          feature={feat}
          isActive={activeIndex === i}
          onActivate={() => onActivate(i)}
        />
      ))}
    </div>
  )
}

function BentoTile({ feature, isActive, onActivate }) {
  const tileRef = useRef(null)

  // WAAPI: glow pulse on activate
  useEffect(() => {
    if (!tileRef.current || !isActive) return
    tileRef.current.animate(
      [
        { boxShadow: `0 0 0px ${feature.glow}` },
        { boxShadow: `0 0 40px ${feature.glow}, 0 4px 32px rgba(0,0,0,0.4)` },
        { boxShadow: `0 0 24px ${feature.glow}, 0 4px 24px rgba(0,0,0,0.3)` },
      ],
      { duration: 400, fill: 'forwards', easing: 'cubic-bezier(0.16,1,0.3,1)' }
    )
  }, [isActive, feature.glow])

  return (
    <article
      ref={tileRef}
      id={`bento-tile-${feature.id}`}
      onClick={() => onActivate()}
      onKeyDown={(e) => e.key === 'Enter' && onActivate()}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      aria-label={`${feature.title}: ${feature.tagline}`}
      style={{
        gridColumn: feature.span.col,
        gridRow: feature.span.row,
        background: isActive
          ? `linear-gradient(135deg, var(--color-surface-alt), ${feature.glow})`
          : 'var(--color-surface)',
        border: `1px solid ${isActive ? feature.accent + '55' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: 28,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        overflow: 'hidden',
        position: 'relative',
        transition: [
          'background 350ms cubic-bezier(0.4,0,0.2,1)',
          'border-color 350ms cubic-bezier(0.4,0,0.2,1)',
          'transform 200ms cubic-bezier(0.16,1,0.3,1)',
        ].join(', '),
        transform: isActive ? 'translateY(-3px) scale(1.01)' : 'translateY(0) scale(1)',
        outline: 'none',
      }}
      onFocus={(e) => e.currentTarget.style.outline = `2px solid ${feature.accent}`}
      onBlur={(e) => e.currentTarget.style.outline = 'none'}
    >
      {/* Accent top bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: `linear-gradient(90deg, ${feature.accent}, transparent)`,
        opacity: isActive ? 1 : 0,
        transition: 'opacity 350ms cubic-bezier(0.4,0,0.2,1)',
        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
      }} aria-hidden="true" />

      {/* Icon */}
      <div style={{
        width: 52, height: 52,
        borderRadius: 'var(--radius-md)',
        background: `${feature.glow}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: feature.accent,
        marginBottom: 18,
        transition: 'background 350ms, transform 200ms',
        transform: isActive ? 'scale(1.08)' : 'scale(1)',
      }}>
        {feature.icon}
      </div>

      {/* Text */}
      <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: feature.accent, marginBottom: 6 }}>
        {feature.tagline}
      </span>
      <h3 style={{ marginBottom: 10, fontSize: '1.15rem' }}>{feature.title}</h3>
      <p style={{ fontSize: '0.88rem', lineHeight: 1.65, flexGrow: 1 }}>{feature.description}</p>

      {/* Expanded detail bullets — visible when active */}
      <div style={{
        maxHeight: isActive ? '180px' : '0',
        overflow: 'hidden',
        transition: 'max-height 350ms cubic-bezier(0.4,0,0.2,1)',
      }}>
        <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 7, paddingLeft: 0, listStyle: 'none' }}>
          {feature.detail.map((point) => (
            <li key={point} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              <span style={{ color: feature.accent, marginTop: 2, flexShrink: 0 }}>✓</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

/* ── Mobile: Accordion ── */
function AccordionList({ features, activeIndex, onActivate }) {
  return (
    <div role="region" aria-label="Feature accordion" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {features.map((feat, i) => (
        <AccordionItem
          key={feat.id}
          feature={feat}
          isOpen={activeIndex === i}
          onToggle={() => onActivate(activeIndex === i ? -1 : i)}
          index={i}
        />
      ))}
    </div>
  )
}

function AccordionItem({ feature, isOpen, onToggle, index }) {
  const bodyRef = useRef(null)
  const prevOpen = useRef(isOpen)

  // WAAPI for open/close
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const wasOpen = prevOpen.current
    prevOpen.current = isOpen

    if (isOpen && !wasOpen) {
      el.animate(
        [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 300, fill: 'forwards', easing: 'cubic-bezier(0.16,1,0.3,1)' }
      )
    }
  }, [isOpen])

  return (
    <article
      id={`accordion-item-${feature.id}`}
      style={{
        border: `1px solid ${isOpen ? feature.accent + '55' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-md)',
        background: isOpen ? 'var(--color-surface-alt)' : 'var(--color-surface)',
        overflow: 'hidden',
        transition: 'border-color 300ms cubic-bezier(0.4,0,0.2,1), background 300ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <button
        id={`accordion-btn-${feature.id}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${feature.id}`}
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '18px 20px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{
          width: 42, height: 42,
          borderRadius: 'var(--radius-sm)',
          background: feature.glow,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: feature.accent,
          flexShrink: 0,
          transition: 'background 300ms, transform 300ms cubic-bezier(0.16,1,0.3,1)',
          transform: isOpen ? 'scale(1.05)' : 'scale(1)',
        }}>
          {feature.icon}
        </div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '1rem' }}>
            {feature.title}
          </div>
          <div style={{ fontSize: '0.8rem', color: feature.accent, marginTop: 2, fontWeight: 500 }}>
            {feature.tagline}
          </div>
        </div>
        {/* Chevron — CSS rotate transition */}
        <svg
          width="18" height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isOpen ? feature.accent : 'var(--color-text-muted)'}
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          style={{
            flexShrink: 0,
            transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1), stroke 300ms',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Panel — max-height CSS transition for smooth collapse */}
      <div
        id={`accordion-panel-${feature.id}`}
        role="region"
        aria-labelledby={`accordion-btn-${feature.id}`}
        style={{
          maxHeight: isOpen ? '320px' : '0',
          overflow: 'hidden',
          transition: 'max-height 350ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div ref={bodyRef} style={{ padding: '0 20px 20px 76px' }}>
          <p style={{ fontSize: '0.9rem', marginBottom: 14 }}>{feature.description}</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none' }}>
            {feature.detail.map((point) => (
              <li key={point} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.83rem', color: 'var(--color-text-secondary)' }}>
                <span style={{ color: feature.accent, marginTop: 2, flexShrink: 0 }}>✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
