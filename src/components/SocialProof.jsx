/* ─────────────────────────────────────────────────────────────────
   Phase 5: Social Proof + Remaining Sections
   ───────────────────────────────────────────────────────────────── */

const STATS = [
  {
    value: '12,000+',
    label: 'Teams worldwide',
    icon: <img src="/svgs/cube-16-solid.svg" width="28" height="28" alt="" aria-hidden="true" style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(33%) saturate(400%) hue-rotate(358deg) brightness(104%)' }} />,
  },
  {
    value: '4.2M',
    label: 'Automated runs/mo',
    icon: <img src="/svgs/arrow-path.svg" width="28" height="28" alt="" aria-hidden="true" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(79%) saturate(383%) hue-rotate(349deg) brightness(103%)' }} />,
  },
  {
    value: '99.98%',
    label: 'Pipeline uptime',
    icon: <img src="/svgs/arrow-trending-up.svg" width="28" height="28" alt="" aria-hidden="true" style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(33%) saturate(400%) hue-rotate(358deg) brightness(104%)' }} />,
  },
  {
    value: '<50ms',
    label: 'Median latency',
    icon: <img src="/svgs/chart-pie.svg" width="28" height="28" alt="" aria-hidden="true" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(79%) saturate(383%) hue-rotate(349deg) brightness(103%)' }} />,
  },
]

const TESTIMONIALS = [
  {
    id: 't1',
    quote: "We cut our data engineering backlog by 70% in the first month. Flowtrace's AI agents caught three critical schema mismatches before they reached production.",
    author: 'Sarah K.',
    role: 'Head of Data Engineering',
    company: 'FinTech startup, Series B',
    initial: 'S',
    accent: '#5B8CFF',
  },
  {
    id: 't2',
    quote: "The visual rule-builder is genuinely impressive. Our analytics team now ships pipeline changes without filing a Jira ticket. That alone saved us 12 hours a week.",
    author: 'Marcus T.',
    role: 'VP of Analytics',
    company: 'E-commerce scale-up',
    initial: 'M',
    accent: '#7FFFD4',
  },
  {
    id: 't3',
    quote: "Flowtrace replaced three separate tools — our Airflow instance, a custom alerting script, and a data quality layer. The consolidation alone justified the switch.",
    author: 'Priya N.',
    role: 'Platform Engineer',
    company: 'SaaS company, 200+ engineers',
    initial: 'P',
    accent: '#A78BFA',
  },
]

const LOGOS = [
  { name: 'Streamline', abbr: 'SL' },
  { name: 'Dataloop',   abbr: 'DL' },
  { name: 'Nexus AI',   abbr: 'NX' },
  { name: 'PulseDB',    abbr: 'PD' },
  { name: 'Infraworks', abbr: 'IW' },
  { name: 'GridPoint',  abbr: 'GP' },
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
            Trusted by teams
          </span>
          <h2 id="social-proof-heading" style={{ marginTop: 14, marginBottom: 16 }}>
            Powering pipelines at scale
          </h2>
          <p style={{ maxWidth: 500, margin: '0 auto', fontSize: '1.05rem' }}>
            From solo builders to enterprise data teams — Flowtrace runs where your data runs.
          </p>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 64,
          }}
          aria-label="Platform statistics"
        >
          {STATS.map(stat => (
            <div
              key={stat.label}
              className="glass-card"
              style={{
                padding: '28px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} aria-hidden="true">{stat.icon}</div>
              <div className="stat-number">{stat.value}</div>
              <div style={{ fontSize: '0.83rem', color: 'var(--color-text-muted)', marginTop: 6, fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Logo strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 64,
            padding: '24px 0',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
          }}
          aria-label="Companies using Flowtrace"
        >
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', width: '100%', textAlign: 'center', marginBottom: 12 }}>
            Trusted by forward-thinking teams
          </p>
          {LOGOS.map(logo => (
            <div
              key={logo.name}
              title={logo.name}
              aria-label={logo.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 22px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '-0.01em',
                transition: 'color 150ms, border-color 150ms',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--color-text-primary)'
                e.currentTarget.style.borderColor = 'var(--color-border-bright)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--color-text-muted)'
                e.currentTarget.style.borderColor = 'var(--color-border)'
              }}
            >
              <span style={{
                width: 26, height: 26,
                borderRadius: 6,
                background: 'var(--color-surface-alt)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 800, color: 'var(--color-primary)',
              }}>
                {logo.abbr}
              </span>
              {logo.name}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}
          aria-label="Customer testimonials"
        >
          {TESTIMONIALS.map(t => (
            <article
              key={t.id}
              className="glass-card"
              style={{ padding: '28px 26px' }}
              aria-label={`Testimonial from ${t.author}`}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 16 }} aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={t.accent} aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-secondary)',
                  marginBottom: 24,
                  position: 'relative',
                  paddingLeft: 20,
                  borderLeft: `2px solid ${t.accent}44`,
                }}
              >
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <footer style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.accent}33, ${t.accent}11)`,
                  border: `1px solid ${t.accent}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: t.accent,
                  flexShrink: 0,
                }} aria-hidden="true">
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-text-primary)' }}>{t.author}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{t.role} · {t.company}</div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
