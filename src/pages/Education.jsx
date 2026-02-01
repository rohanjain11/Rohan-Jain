import { useReveal } from '../hooks/useReveal'
import { EDUCATION, PUBLICATION } from '../data/content'
import ParticleBackground from '../components/ParticleBackground'

export default function Education() {
  const reveals = EDUCATION.map(() => useReveal())
  const pubReveal = useReveal()

  return (
    <>
      <ParticleBackground />
      
      <header className="page-hero" style={{ paddingBottom: '40px', paddingTop: '100px' }}>
        <div className="container">
          <h1 className="page-title">Education</h1>
          <p className="page-subtitle">
            Academic background and continuous learning in data science and computer engineering.
          </p>
        </div>
      </header>

      <section className="section" id="main" style={{ paddingTop: '0', paddingBottom: '20px' }}>
        <div className="container">
          <div className="grid grid--2">
            {EDUCATION.map((edu, idx) => {
              const getIcon = () => {
                if (edu.location.includes('Boulder')) return 'mountains';
                if (edu.location.includes('Mumbai')) return 'buildings';
                return null;
              };
              
              return (
              <div key={idx} className="card reveal education-card-bg" ref={reveals[idx]}>
                <div className="education-card-icon" aria-hidden="true">
                  {getIcon() === 'mountains' && (
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      {/* Rocky Mountains - Boulder, Colorado */}
                      {/* Left mountain range */}
                      <path d="M2 20 L3.5 15 L5 18 L6 12 L7.5 16 L9 20 Z" />
                      {/* Central peak (tallest - Flatirons) */}
                      <path d="M8 20 L10 6 L12 8 L14 4 L16 8 L18 6 L20 20 Z" />
                      {/* Right mountain range */}
                      <path d="M15 20 L16.5 14 L18 17 L19 11 L20.5 15 L22 20 Z" />
                      {/* Additional detail peaks */}
                      <path d="M4 20 L4.5 17 L5.5 19 L6.5 16 L7 20 Z" opacity="0.7" />
                      <path d="M17 20 L17.5 16 L18.5 18 L19.5 15 L20 20 Z" opacity="0.7" />
                    </svg>
                  )}
                  {getIcon() === 'buildings' && (
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5">
                      {/* Mumbai Skyline - Modern cityscape */}
                      {/* Building 1 - Short residential */}
                      <rect x="2" y="14" width="3" height="7" rx="0.3"/>
                      <rect x="2.3" y="15" width="0.8" height="0.8" fill="none"/>
                      <rect x="3.4" y="15" width="0.8" height="0.8" fill="none"/>
                      <rect x="2.3" y="16.5" width="0.8" height="0.8" fill="none"/>
                      <rect x="3.4" y="16.5" width="0.8" height="0.8" fill="none"/>
                      
                      {/* Building 2 - Medium office */}
                      <rect x="5.5" y="10" width="3.5" height="11" rx="0.3"/>
                      <rect x="6" y="11" width="0.9" height="0.9" fill="none"/>
                      <rect x="7.2" y="11" width="0.9" height="0.9" fill="none"/>
                      <rect x="8.4" y="11" width="0.9" height="0.9" fill="none"/>
                      <rect x="6" y="12.8" width="0.9" height="0.9" fill="none"/>
                      <rect x="7.2" y="12.8" width="0.9" height="0.9" fill="none"/>
                      <rect x="8.4" y="12.8" width="0.9" height="0.9" fill="none"/>
                      <rect x="6" y="14.6" width="0.9" height="0.9" fill="none"/>
                      <rect x="7.2" y="14.6" width="0.9" height="0.9" fill="none"/>
                      <rect x="8.4" y="14.6" width="0.9" height="0.9" fill="none"/>
                      
                      {/* Building 3 - Tall skyscraper */}
                      <rect x="9.5" y="4" width="4" height="17" rx="0.3"/>
                      <rect x="10" y="5" width="0.9" height="0.9" fill="none"/>
                      <rect x="11.2" y="5" width="0.9" height="0.9" fill="none"/>
                      <rect x="12.4" y="5" width="0.9" height="0.9" fill="none"/>
                      <rect x="10" y="6.8" width="0.9" height="0.9" fill="none"/>
                      <rect x="11.2" y="6.8" width="0.9" height="0.9" fill="none"/>
                      <rect x="12.4" y="6.8" width="0.9" height="0.9" fill="none"/>
                      <rect x="10" y="8.6" width="0.9" height="0.9" fill="none"/>
                      <rect x="11.2" y="8.6" width="0.9" height="0.9" fill="none"/>
                      <rect x="12.4" y="8.6" width="0.9" height="0.9" fill="none"/>
                      <rect x="10" y="10.4" width="0.9" height="0.9" fill="none"/>
                      <rect x="11.2" y="10.4" width="0.9" height="0.9" fill="none"/>
                      <rect x="12.4" y="10.4" width="0.9" height="0.9" fill="none"/>
                      <rect x="10" y="12.2" width="0.9" height="0.9" fill="none"/>
                      <rect x="11.2" y="12.2" width="0.9" height="0.9" fill="none"/>
                      <rect x="12.4" y="12.2" width="0.9" height="0.9" fill="none"/>
                      
                      {/* Building 4 - Medium-high office */}
                      <rect x="14" y="8" width="3.5" height="13" rx="0.3"/>
                      <rect x="14.5" y="9" width="0.9" height="0.9" fill="none"/>
                      <rect x="15.7" y="9" width="0.9" height="0.9" fill="none"/>
                      <rect x="16.9" y="9" width="0.9" height="0.9" fill="none"/>
                      <rect x="14.5" y="10.8" width="0.9" height="0.9" fill="none"/>
                      <rect x="15.7" y="10.8" width="0.9" height="0.9" fill="none"/>
                      <rect x="16.9" y="10.8" width="0.9" height="0.9" fill="none"/>
                      <rect x="14.5" y="12.6" width="0.9" height="0.9" fill="none"/>
                      <rect x="15.7" y="12.6" width="0.9" height="0.9" fill="none"/>
                      <rect x="16.9" y="12.6" width="0.9" height="0.9" fill="none"/>
                      
                      {/* Building 5 - Short commercial */}
                      <rect x="18" y="15" width="3" height="6" rx="0.3"/>
                      <rect x="18.3" y="16" width="0.8" height="0.8" fill="none"/>
                      <rect x="19.4" y="16" width="0.8" height="0.8" fill="none"/>
                      <rect x="20.5" y="16" width="0.8" height="0.8" fill="none"/>
                      <rect x="18.3" y="17.5" width="0.8" height="0.8" fill="none"/>
                      <rect x="19.4" y="17.5" width="0.8" height="0.8" fill="none"/>
                      <rect x="20.5" y="17.5" width="0.8" height="0.8" fill="none"/>
                    </svg>
                  )}
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <h2 className="card__title">{edu.school}</h2>
                  <p className="card__meta">{edu.degree}</p>
                  <p className="card__meta" style={{ marginTop: '4px' }}>
                    {edu.dates} • {edu.location}
                  </p>
                  <p className="card__meta" style={{ marginTop: '8px', color: 'var(--accent)', fontWeight: '600' }}>
                    {edu.details}
                  </p>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: '600' }}>
                    Relevant Coursework:
                  </p>
                  <p className="card__body">{edu.coursework}</p>
                </div>
              </div>
            );
            })}
          </div>

          <div className="section__header" style={{ marginTop: '64px', marginBottom: '32px' }}>
            <h2 className="section__title">Publications</h2>
          </div>

          <div className="card reveal education-card-bg" ref={pubReveal}>
            <div className="education-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Simple stickman doing yoga pose */}
                {/* Head */}
                <circle cx="12" cy="4" r="2"/>
                {/* Body */}
                <line x1="12" y1="6" x2="12" y2="16"/>
                {/* Left arm - raised up */}
                <line x1="12" y1="8" x2="8" y2="6"/>
                {/* Right arm - raised up */}
                <line x1="12" y1="8" x2="16" y2="6"/>
                {/* Left leg - bent outward */}
                <line x1="12" y1="16" x2="8" y2="20"/>
                {/* Right leg - bent outward */}
                <line x1="12" y1="16" x2="16" y2="20"/>
              </svg>
            </div>
            <h3 className="card__title">{PUBLICATION.title}</h3>
            <p className="card__body" style={{ marginTop: '8px', marginBottom: '20px' }}>{PUBLICATION.note}</p>
            {PUBLICATION.link && (
              <a
                href={PUBLICATION.link}
                target="_blank"
                rel="noreferrer"
                className="btn btn--primary"
              >
                Read Publication →
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
