import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import BentoFeatures from './components/BentoFeatures'
import Pricing     from './components/Pricing'
import SocialProof from './components/SocialProof'
import Footer      from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Visual divider */}
        <div className="container"><div className="divider" /></div>

        <BentoFeatures />

        <div className="container"><div className="divider" /></div>

        <SocialProof />

        <div className="container"><div className="divider" /></div>

        <Pricing />

        {/* CTA Banner */}
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}

function CTABanner() {
  return (
    <section
      aria-labelledby="cta-heading"
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(17,76,90,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 id="cta-heading" style={{ marginBottom: 18, maxWidth: 700, margin: '0 auto 18px' }}>
          Ready to stop babysitting<br />
          <span className="gradient-text">your pipelines?</span>
        </h2>
        <p style={{ fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Join 12,000+ teams who automated their data ops with Synapse. Free to start, no credit card required.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#pricing" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
            Start for Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="mailto:sales@synapse.app" className="btn-ghost" style={{ fontSize: '1rem', padding: '14px 36px' }}>
            Talk to Sales
          </a>
        </div>
      </div>
    </section>
  )
}
