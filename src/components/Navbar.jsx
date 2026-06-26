import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Social Proof', href: '#social-proof' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: `background ${200}ms cubic-bezier(0.16,1,0.3,1), border-color 200ms cubic-bezier(0.16,1,0.3,1), backdrop-filter 200ms`,
        background: scrolled ? 'rgba(10, 11, 14, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <LogoMark />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}>
            flowtrace
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }} aria-label="Main navigation">
          <div style={{ display: 'flex', gap: 4, marginRight: 16 }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  padding: '6px 14px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  borderRadius: 'var(--radius-full)',
                  transition: 'color 150ms var(--ease-out), background 150ms var(--ease-out)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-text-primary)'
                  e.currentTarget.style.background = 'var(--color-surface-alt)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a href="#pricing" className="btn-primary" style={{ padding: '9px 22px', fontSize: '0.88rem' }}>
            Get Started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-primary)',
            padding: 8,
          }}
          className="mobile-hamburger"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        id="mobile-menu"
        style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '260px' : '0',
          transition: 'max-height 350ms cubic-bezier(0.4,0,0.2,1)',
          background: 'rgba(10,11,14,0.96)',
          borderTop: menuOpen ? '1px solid var(--color-border)' : 'none',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '12px 24px 20px' }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '12px 16px',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                transition: 'color 150ms, background 150ms',
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="#pricing" className="btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>
            Get Started
          </a>
        </nav>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  )
}

function LogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Flowtrace logo mark">
      <rect width="32" height="32" rx="9" fill="url(#logo-grad)" />
      <path d="M8 11C8 11 11 9 14 11C17 13 20 9 23 11" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M8 16C8 16 11 14 14 16C17 18 20 14 23 16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M8 21C8 21 11 19 14 21C17 23 20 19 23 21" stroke="#7FFFD4" strokeWidth="2" strokeLinecap="round"/>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5B8CFF"/>
          <stop offset="100%" stopColor="#3D6BE0"/>
        </linearGradient>
      </defs>
    </svg>
  )
}
