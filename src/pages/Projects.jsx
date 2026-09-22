import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { PROJECTS, SITE } from '../data/content'
import ParticleBackground from '../components/ParticleBackground'

export default function Projects() {
  const reveals = PROJECTS.map(() => useReveal())
  const revealLast = useReveal()

  return (
    <>
      <ParticleBackground />
      
      <header className="page-hero" style={{ paddingBottom: '40px', paddingTop: '100px' }}>
        <div className="container">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">
            Data science and engineering projects showcasing problem-solving, technical skills, and measurable impact.
          </p>
        </div>
      </header>

      <section className="section" id="main" style={{ paddingTop: '0', paddingBottom: '20px' }}>
        <div className="container">
          <div className="grid grid--2">
            {PROJECTS.map((project, idx) => (
              <div key={idx} className="card reveal project-card-bg" ref={reveals[idx]} data-icon={project.icon}>
                <div className="project-card-icon" aria-hidden="true">
                  {project.icon === 'chart' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18"/>
                      <rect x="7" y="12" width="3" height="6"/>
                      <rect x="12" y="8" width="3" height="10"/>
                      <rect x="17" y="4" width="3" height="14"/>
                    </svg>
                  )}
                  {project.icon === 'bicycle' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="5.5" cy="17.5" r="3.5"/>
                      <circle cx="18.5" cy="17.5" r="3.5"/>
                      <path d="M15 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/>
                      <path d="M12 17.5V14l-3-3 4-3 2 3h3"/>
                    </svg>
                  )}
                  {project.icon === 'plane' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                  )}
                  {project.icon === 'document' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                  )}
                  {project.icon === 'beaker' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.4"/>
                      <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none"/>
                      <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" transform="rotate(60 12 12)"/>
                      <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" transform="rotate(120 12 12)"/>
                    </svg>
                  )}
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <h2 className="card__title">{project.name}</h2>
                  <p className="card__meta">{project.dates}</p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ marginBottom: '12px', color: 'var(--text-primary)', fontWeight: '600' }}>
                    <span style={{ color: 'var(--accent)' }}>Problem:</span> {project.problem}
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: '600' }}>Solution:</span> {project.built}
                  </p>
                  <p>
                    <span style={{ color: 'var(--accent)', fontWeight: '600' }}>Impact:</span> {project.impact}
                  </p>
                </div>

                <div className="tags">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="tag">{tech}</span>
                  ))}
                </div>

                {project.links && project.links.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    {project.links.map((link, linkIdx) => (
                      <a
                        key={linkIdx}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn--ghost"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="card reveal" ref={revealLast} style={{ marginTop: '48px', textAlign: 'center', borderTop: '2px solid var(--accent)' }}>
            <p className="card__body" style={{ marginBottom: '24px', fontSize: '1.125rem' }}>
              For more projects and code samples, visit my GitHub profile.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                className="btn btn--primary"
                href={SITE.links.github}
                target="_blank"
                rel="noreferrer"
              >
                Visit GitHub
              </a>
              <Link className="btn btn--secondary" to="/contact">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
