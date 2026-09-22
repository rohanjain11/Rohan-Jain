import { useReveal } from '../hooks/useReveal'
import { SKILLS } from '../data/content'
import ParticleBackground from '../components/ParticleBackground'

export default function Skills() {
  const skillKeys = Object.keys(SKILLS)
  const reveals = skillKeys.map(() => useReveal())
  const reveal1 = useReveal()
  const reveal2 = useReveal()
  const reveal3 = useReveal()
  const reveal4 = useReveal()

  return (
    <>
      <ParticleBackground />
      
      <header className="page-hero" style={{ paddingBottom: '40px', paddingTop: '100px' }}>
        <div className="container">
          <h1 className="page-title">Skills & Expertise</h1>
          <p className="page-subtitle">
            Technical skills and tools I use to build data-driven solutions. 
            Focused on practical application and measurable results.
          </p>
        </div>
      </header>

      <section className="section" id="main" style={{ paddingTop: '0', paddingBottom: '20px' }}>
        <div className="container">
          <div className="grid grid--2 skills-grid">
            {skillKeys.map((key, idx) => {
              const getIcon = (skillKey) => {
                if (skillKey === 'Languages') return 'code';
                if (skillKey === 'Data and ML') return 'chart';
                if (skillKey === 'Deep Learning') return 'brain';
                if (skillKey === 'Data Quality and Reproducibility') return 'shield';
                if (skillKey === 'Visualization and BI') return 'bar-chart';
                if (skillKey === 'Engineering and Cloud') return 'server';
                return 'code';
              };
              
              return (
              <div key={key} className="card reveal skill-card-bg" ref={reveals[idx]} data-icon={getIcon(key)}>
                <div className="skill-card-icon" aria-hidden="true">
                  {getIcon(key) === 'code' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                    </svg>
                  )}
                  {getIcon(key) === 'chart' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                      <line x1="9" y1="7" x2="15" y2="7"/>
                      <line x1="9" y1="11" x2="15" y2="11"/>
                      <line x1="9" y1="15" x2="13" y2="15"/>
                    </svg>
                  )}
                  {getIcon(key) === 'brain' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v3m0 16v3M1 12h3m16 0h3"/>
                      <path d="M5.64 5.64l2.12 2.12m8.48 8.48l2.12 2.12M5.64 18.36l2.12-2.12m8.48-8.48l2.12-2.12"/>
                      <circle cx="12" cy="12" r="8"/>
                    </svg>
                  )}
                  {getIcon(key) === 'shield' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                  )}
                  {getIcon(key) === 'bar-chart' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="20" x2="21" y2="20"/>
                      <line x1="6" y1="20" x2="6" y2="14"/>
                      <line x1="10" y1="20" x2="10" y2="8"/>
                      <line x1="14" y1="20" x2="14" y2="12"/>
                      <line x1="18" y1="20" x2="18" y2="6"/>
                    </svg>
                  )}
                  {getIcon(key) === 'server' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                      <line x1="6" y1="6" x2="6.01" y2="6"/>
                      <line x1="6" y1="18" x2="6.01" y2="18"/>
                    </svg>
                  )}
                </div>
                <h2 className="card__title" style={{ marginBottom: '20px' }}>{key}</h2>
                
                {/* --i drives the entrance stagger; see .skill-tags in index.css. */}
                <div className="skill-tags">
                  {Array.isArray(SKILLS[key]) ? (
                    SKILLS[key].map((skill, i) => (
                      <span key={i} className="tag" style={{ '--i': i }}>{skill}</span>
                    ))
                  ) : (
                    <span className="tag" style={{ '--i': 0 }}>{SKILLS[key]}</span>
                  )}
                </div>
              </div>
            );
            })}
          </div>

          <div className="section__header" style={{ marginTop: '64px', marginBottom: '32px' }}>
            <h2 className="section__title">Work Philosophy</h2>
            <p className="section__subtitle">
              Four habits that show up in everything I ship, and the evidence for each
            </p>
          </div>

          <div className="grid grid--2">
            <div className="card reveal" ref={reveal1}>
              <h3 className="card__title">Measure Before I Believe</h3>
              <p className="card__body">
                I built a 115-question evaluation harness for an on-prem LLM agent and then let it
                overrule me. It took tool recall from 0.47 to 0.97, and it scored my own recommended
                gate design at 0.03. I shipped the alternative in about 80 lines and stamped the
                correction on the original document so nobody built the dead version.
              </p>
            </div>

            <div className="card reveal" ref={reveal2}>
              <h3 className="card__title">Fail Closed by Default</h3>
              <p className="card__body">
                The MCP server I designed is read-only by construction, with a mandatory time-window
                bound on every scanning query. I proved the containment instead of asserting it: an
                adversarial prompt-injection test instructed the agent to delete production data and
                confirmed it could not.
              </p>
            </div>

            <div className="card reveal" ref={reveal3}>
              <h3 className="card__title">Reproducible Artifacts</h3>
              <p className="card__body">
                Consistent training and evaluation scripts, and artifact bundles that carry the model,
                its preprocessing, metadata and verification plots together rather than scattered
                across a notebook. Documentation says what changed and why, so the next person can
                extend the work without me.
              </p>
            </div>

            <div className="card reveal" ref={reveal4}>
              <h3 className="card__title">Quality Gates</h3>
              <p className="card__body">
                Schema, unit and range checks at ingestion, fail-fast on an integrity failure, and an
                inference gate that rejects any model failing to beat its own baseline. That gate cut
                failed production runs by 90% and saved about 20 engineer-hours a month with no manual
                review.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
