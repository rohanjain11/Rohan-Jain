import { useReveal } from '../hooks/useReveal'
import { EXPERIENCE } from '../data/content'
import ParticleBackground from '../components/ParticleBackground'

export default function Experience() {
  const reveals = EXPERIENCE.map(() => useReveal())

  return (
    <>
      <ParticleBackground />
      
      <header className="page-hero" style={{ paddingBottom: '40px', paddingTop: '100px' }}>
        <div className="container">
          <h1 className="page-title">Experience</h1>
          <p className="page-subtitle">
            Shipped workflows across pipelines, analytics, and ML, backed by metrics and clean artifacts.
          </p>
        </div>
      </header>

      <section className="section experience-section" id="main" style={{ paddingTop: '0', paddingBottom: '20px' }}>
        <div className="experience-container-wrapper">
          <div className="experience-grid">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="experience-card reveal" ref={reveals[idx]}>
                <div className="experience-card-icon-bg" aria-hidden="true">
                  {exp.icon === 'cloud' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z"/>
                    </svg>
                  )}
                  {exp.icon === 'beaker' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.4"/>
                      <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none"/>
                      <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" transform="rotate(60 12 12)"/>
                      <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" transform="rotate(120 12 12)"/>
                    </svg>
                  )}
                </div>
                <div className="experience-card__top">
                  <a 
                    href={idx === 0 ? 'https://www.nexusweatherandclimate.com/' : 'https://www.kopflab.org/'}
                    target="_blank"
                    rel="noreferrer"
                    className="experience-card__icon"
                    aria-label={`Visit ${exp.org} website`}
                  >
                    {idx === 0 ? (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z"/>
                      </svg>
                    ) : (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 2v2H7v2H5v2H3v12h18V8h-2V6h-2V4h-2V2H9zm0 2h6v2h2v2h2v2h2v10H5V10h2V8h2V6h2V4zm-2 4v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zm-8 4v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"/>
                      </svg>
                    )}
                  </a>
                  
                  <div className="experience-card__header">
                    <div>
                      <h2 className="experience-card__title">{exp.org}</h2>
                      <p className="experience-card__role">{exp.title}</p>
                    </div>
                    <div className="experience-card__meta">
                      <span className="experience-card__date">{exp.dates}</span>
                      <span className="experience-card__location">{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="experience-card__content">

                  <div className="experience-card__tags">
                    {exp.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div className="experience-card__body">
                    <ul className="experience-card__list">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="experience-card__bullet-item">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
