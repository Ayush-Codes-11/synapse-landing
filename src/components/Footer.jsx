export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        padding: '60px 0 32px',
      }}
      aria-label="Site footer"
    >
      <div className="container">
        <div className="footer-cols-grid">
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="Synapse logo">
                <rect width="32" height="32" rx="8" fill="url(#footer-logo-grad)" />
                <path d="M8 11C8 11 11 9 14 11C17 13 20 9 23 11" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                <path d="M8 16C8 16 11 14 14 16C17 18 20 14 23 16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M8 21C8 21 11 19 14 21C17 23 20 19 23 21" stroke="#7FFFD4" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="footer-logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#114C5A"/>
                    <stop offset="100%" stopColor="#172B36"/>
                  </linearGradient>
                </defs>
              </svg>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}>
                Synapse
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', maxWidth: 220, lineHeight: 1.6 }}>
              AI-powered data automation. Wire it once, let it think for itself.
            </p>
          </div>

          {/* Links */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 16 }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 150ms' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            © {year} Synapse. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Built with ♥ using React + Vite + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

const FOOTER_COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Features',     href: '#features' },
      { label: 'Pricing',      href: '#pricing' },
      { label: 'Changelog',    href: '#' },
      { label: 'Roadmap',      href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',        href: '#' },
      { label: 'Blog',         href: '#' },
      { label: 'Careers',      href: '#' },
      { label: 'Contact',      href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy',      href: '#' },
      { label: 'Terms',        href: '#' },
      { label: 'Security',     href: '#' },
      { label: 'Status',       href: '#' },
    ],
  },
]
