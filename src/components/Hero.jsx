import { useEffect, useRef } from 'react'

export default function Hero() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const gridRef = useRef(null)

  // Subtle mouse parallax on orbs — WAAPI
  useEffect(() => {
    const handler = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy

      if (orb1Ref.current) {
        orb1Ref.current.animate(
          [{ transform: `translate(${dx * 18}px, ${dy * 12}px)` }],
          { duration: 800, fill: 'forwards', easing: 'cubic-bezier(0.16,1,0.3,1)' }
        )
      }
      if (orb2Ref.current) {
        orb2Ref.current.animate(
          [{ transform: `translate(${-dx * 24}px, ${-dy * 16}px)` }],
          { duration: 800, fill: 'forwards', easing: 'cubic-bezier(0.16,1,0.3,1)' }
        )
      }
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 100,
        paddingBottom: 80,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient orbs */}
      <div
        ref={orb1Ref}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(91,140,255,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />
      <div
        ref={orb2Ref}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(127,255,212,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />

      {/* Grid lines background */}
      <div
        ref={gridRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(42,45,53,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,45,53,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div className="animate-fade-in-up" style={{ marginBottom: 28 }}>
          <span className="section-label">
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <circle cx="5" cy="5" r="5" fill="var(--color-accent)" />
            </svg>
            AI-Powered Pipeline Automation
          </span>
        </div>

        {/* Heading */}
        <h1
          className="animate-fade-in-up animate-delay-100"
          style={{ marginBottom: 28, maxWidth: 900, margin: '0 auto 28px' }}
        >
          Turn scattered pipelines into{' '}
          <span className="gradient-text">self-running workflows</span>
        </h1>

        {/* Subhead */}
        <p
          className="animate-fade-in-up animate-delay-200"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            maxWidth: 640,
            margin: '0 auto 44px',
            lineHeight: 1.7,
          }}
        >
          AI agents that ingest, clean, and route your data — so your team stops babysitting pipelines.
          Connect once, automate everything.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-up animate-delay-300"
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}
        >
          <a href="#pricing" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
            Start for Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#features" className="btn-ghost" style={{ fontSize: '1rem', padding: '14px 32px' }}>
            See Features
          </a>
        </div>

        {/* Stats row */}
        <div
          className="animate-fade-in-up animate-delay-400"
          style={{
            display: 'flex',
            gap: 0,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 36px',
                borderRight: i < HERO_STATS.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <span className="stat-number">{stat.value}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: 4, fontWeight: 500 }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Hero visual — pipeline diagram SVG */}
        <div
          className="animate-fade-in-up animate-delay-500"
          style={{ marginTop: 64 }}
        >
          <HeroDiagram />
        </div>
      </div>
    </section>
  )
}

const HERO_STATS = [
  { value: '12,000+', label: 'Teams using Flowtrace' },
  { value: '4.2M',    label: 'Automated runs / mo' },
  { value: '99.98%',  label: 'Pipeline uptime' },
  { value: '200+',    label: 'Data sources' },
]

function HeroDiagram() {
  return (
    <div
      style={{
        position: 'relative',
        maxWidth: 860,
        margin: '0 auto',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px 24px 24px',
        boxShadow: '0 8px 64px rgba(0,0,0,0.5), 0 0 80px rgba(91,140,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Window chrome dots */}
      <div style={{ display: 'flex', gap: 7, position: 'absolute', top: 18, left: 20 }}>
        {['#FF5F57','#FEBC2E','#28C840'].map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.8 }} aria-hidden="true" />
        ))}
      </div>

      <svg
        viewBox="0 0 800 180"
        width="100%"
        height="auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Flowtrace data pipeline diagram showing data flowing through AI processing stages"
        role="img"
        style={{ display: 'block' }}
      >
        {/* Connecting flow lines */}
        <path d="M160 90 L220 90" stroke="#2A2D35" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M340 90 L400 90" stroke="#2A2D35" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M520 90 L580 90" stroke="#2A2D35" strokeWidth="2" strokeDasharray="4 3" />

        {/* Animated flow dots */}
        <circle r="4" fill="#5B8CFF" opacity="0.9">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M160 90 L220 90 L340 90 L400 90 L520 90 L580 90 L700 90" />
        </circle>
        <circle r="3" fill="#7FFFD4" opacity="0.7">
          <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite" path="M160 90 L220 90 L340 90 L400 90 L520 90 L580 90 L700 90" />
        </circle>

        {/* Source nodes */}
        {PIPELINE_NODES.map((node, i) => (
          <g key={node.label} transform={`translate(${node.x}, ${node.y})`}>
            <rect x="-60" y="-34" width="120" height="68" rx="12"
              fill={node.active ? 'rgba(91,140,255,0.12)' : 'rgba(30,33,40,0.8)'}
              stroke={node.active ? 'rgba(91,140,255,0.5)' : '#2A2D35'}
              strokeWidth="1.5"
            />
            <text x="0" y="-10" textAnchor="middle" fontSize="18" fill={node.active ? '#5B8CFF' : '#9499A6'} aria-hidden="true">
              {node.icon}
            </text>
            <text x="0" y="10" textAnchor="middle" fontSize="11" fontWeight="600" fill="#F4F5F7" fontFamily="Inter, sans-serif">
              {node.label}
            </text>
            <text x="0" y="24" textAnchor="middle" fontSize="9" fill="#9499A6" fontFamily="Inter, sans-serif">
              {node.sub}
            </text>
          </g>
        ))}
      </svg>

      {/* Bottom shimmer bar */}
      <div style={{
        marginTop: 16,
        height: 3,
        background: 'linear-gradient(90deg, transparent, #5B8CFF, #7FFFD4, transparent)',
        backgroundSize: '200% auto',
        animation: 'shimmer 2.5s linear infinite',
        borderRadius: 'var(--radius-full)',
      }} aria-hidden="true" />
    </div>
  )
}

const PIPELINE_NODES = [
  { x: 100, y: 90, label: 'Ingest',  sub: '200+ sources', icon: '⬇', active: false },
  { x: 280, y: 90, label: 'Clean',   sub: 'AI normalise', icon: '✦', active: true },
  { x: 460, y: 90, label: 'Route',   sub: 'Smart rules',  icon: '⚡', active: true },
  { x: 640, y: 90, label: 'Deliver', sub: 'Any target',   icon: '✓', active: false },
]
