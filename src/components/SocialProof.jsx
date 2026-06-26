/* ─────────────────────────────────────────────────────────────────
   Social Proof — stat-based only.
   No fabricated company logos, no named testimonials (per spec).
   ───────────────────────────────────────────────────────────────── */

const STATS = [
  {
    value: '12,000+',
    label: 'Teams using Synapse',
    icon: <img src="/svgs/cube-16-solid.svg" width="28" height="28" alt="" aria-hidden="true"
      style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(33%) saturate(400%) hue-rotate(358deg) brightness(104%)' }} />,
  },
  {
    value: '4.2M',
    label: 'Automated runs this month',
    icon: <img src="/svgs/arrow-path.svg" width="28" height="28" alt="" aria-hidden="true"
      style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(79%) saturate(383%) hue-rotate(349deg) brightness(103%)' }} />,
  },
  {
    value: '99.98%',
    label: 'Pipeline uptime',
    icon: <img src="/svgs/arrow-trending-up.svg" width="28" height="28" alt="" aria-hidden="true"
      style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(33%) saturate(400%) hue-rotate(358deg) brightness(104%)' }} />,
  },
  {
    value: '<50ms',
    label: 'Median latency',
    icon: <img src="/svgs/chart-pie.svg" width="28" height="28" alt="" aria-hidden="true"
      style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(79%) saturate(383%) hue-rotate(349deg) brightness(103%)' }} />,
  },
]

const HIGHLIGHTS = [
  {
    icon: <img src="/svgs/cog-8-tooth.svg" width="22" height="22" alt="" aria-hidden="true"
      style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(79%) saturate(383%) hue-rotate(349deg) brightness(103%)' }} />,
    text: 'Agents self-heal broken pipelines without paging your team',
    accent: '#FF9932',
  },
  {
    icon: <img src="/svgs/link.svg" width="22" height="22" alt="" aria-hidden="true"
      style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(33%) saturate(400%) hue-rotate(358deg) brightness(104%)' }} />,
    text: '200+ pre-built connectors — wire a new source in under 5 minutes',
    accent: '#FFC801',
  },
  {
    icon: <img src="/svgs/arrow-trending-up.svg" width="22" height="22" alt="" aria-hidden="true"
      style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(33%) saturate(400%) hue-rotate(358deg) brightness(104%)' }} />,
    text: 'Real-time dashboards update every second — no refresh needed',
    accent: '#FFC801',
  },
]

export default function SocialProof() {
  return (
    <section id="social-proof" aria-labelledby="social-proof-heading">
      <div className="container">

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="section-label" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <circle cx="5" cy="5" r="5" fill="var(--color-accent2)" />
            </svg>
            By the numbers
          </span>
          <h2 id="social-proof-heading" style={{ marginTop: 14, marginBottom: 16 }}>
            Trusted by 12,000+ teams worldwide
          </h2>
          <p style={{ maxWidth: 500, margin: '0 auto', fontSize: '1.05rem' }}>
            From solo builders to enterprise data teams — Synapse runs where your data runs.
          </p>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 56,
          }}
          aria-label="Platform statistics"
        >
          {STATS.map(stat => (
            <div
              key={stat.label}
              className="glass-card"
              style={{ padding: '28px 24px', textAlign: 'center' }}
            >
              <div style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} aria-hidden="true">
                {stat.icon}
              </div>
              <div className="stat-number">{stat.value}</div>
              <div style={{ fontSize: '0.83rem', color: 'var(--color-text-muted)', marginTop: 6, fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature highlights strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}
          aria-label="Platform highlights"
        >
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: '22px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  width: 40, height: 40,
                  borderRadius: 10,
                  background: `${h.accent}18`,
                  border: `1px solid ${h.accent}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {h.icon}
              </span>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', margin: 0 }}>
                {h.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
