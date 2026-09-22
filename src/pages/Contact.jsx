import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { SITE } from '../data/content'
import ParticleBackground from '../components/ParticleBackground'

export default function Contact() {
  const reveal1 = useReveal()
  const reveal2 = useReveal()

  const contactMethods = [
    {
      label: 'Email',
      value: SITE.emailPrimary,
      href: `mailto:${SITE.emailPrimary}`,
    },
    {
      label: 'LinkedIn',
      value: 'Connect with me',
      href: SITE.links.linkedin,
      external: true
    },
    {
      label: 'GitHub',
      value: 'View my code',
      href: SITE.links.github,
      external: true
    },
  ]

  const quickLinks = [
    { label: SITE.ctas.resumeMaster.label, href: SITE.ctas.resumeMaster.href },
    { label: 'Experience', to: '/experience' },
    { label: 'Projects', to: '/projects' },
    { label: 'Skills', to: '/skills' },
  ]

  return (
    <>
      <ParticleBackground />
      
      <header className="page-hero" style={{ paddingBottom: '40px', paddingTop: '100px' }}>
        <div className="container">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">
            I'm always interested in discussing AI and ML engineering work, collaboration 
            opportunities, or new roles. Let's connect!
          </p>
        </div>
      </header>

      <section className="section" id="main" style={{ paddingTop: '0', paddingBottom: '20px' }}>
        <div className="container">
          <div className="grid grid--2">
            <div className="card reveal" ref={reveal1}>
              <h2 className="card__title" style={{ marginBottom: '24px' }}>Contact Me</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {contactMethods.map((method, idx) => (
                  <a
                    key={idx}
                    href={method.href}
                    target={method.external ? '_blank' : undefined}
                    rel={method.external ? 'noreferrer' : undefined}
                    className="btn btn--secondary"
                    style={{
                      justifyContent: 'flex-start',
                      padding: '20px',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {method.label}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {method.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="card reveal" ref={reveal2}>
              <h2 className="card__title" style={{ marginBottom: '24px' }}>Quick Links</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {quickLinks.map((link, idx) => (
                  link.to ? (
                    <Link
                      key={idx}
                      to={link.to}
                      className="btn btn--ghost"
                      style={{
                        justifyContent: 'flex-start',
                        padding: '16px 20px',
                        textAlign: 'left'
                      }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={idx}
                      href={link.href}
                      className="btn btn--ghost"
                      style={{
                        justifyContent: 'flex-start',
                        padding: '16px 20px',
                        textAlign: 'left'
                      }}
                    >
                      {link.label}
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
