import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { EXPERIENCE } from '../data/content'
import ParticleBackground from '../components/ParticleBackground'

/** How many highlights a collapsed card shows before "Show all". */
const PREVIEW_COUNT = 3

const ICONS = {
  chip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z" />
    </svg>
  ),
  beaker: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.4" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" transform="rotate(120 12 12)" />
    </svg>
  ),
}

export default function Experience() {
  const reveals = EXPERIENCE.map(() => useReveal())
  // Cards start collapsed so the grid reads as a scannable overview. A role with
  // 18 highlights would otherwise dwarf whatever sits beside it.
  const [expanded, setExpanded] = useState(() => new Set())

  const toggle = (idx) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })

  return (
    <>
      <ParticleBackground />

      <header className="page-hero">
        <div className="container">
          <h1 className="page-title">Experience</h1>
          <p className="page-subtitle">
            Shipped workflows across pipelines, analytics, and ML, backed by metrics and clean artifacts.
          </p>
        </div>
      </header>

      <section className="section experience-section" id="main">
        <div className="experience-container-wrapper">
          <div className="experience-grid">
            {EXPERIENCE.map((exp, idx) => {
              const isOpen = expanded.has(idx)
              const shown = isOpen ? exp.bullets : exp.bullets.slice(0, PREVIEW_COUNT)
              const hidden = exp.bullets.length - PREVIEW_COUNT
              const panelId = `exp-panel-${idx}`

              return (
                <article
                  key={idx}
                  /* className stays STATIC on purpose. useReveal adds `visible`
                     imperatively via classList; if React also owned this
                     attribute it would overwrite that class on every re-render
                     and the card would snap back to opacity 0 the moment you
                     expanded it. Open state travels as a data attribute. */
                  className="experience-card reveal"
                  data-open={isOpen ? 'true' : 'false'}
                  ref={reveals[idx]}
                >
                  <div className="experience-card-icon-bg" aria-hidden="true">
                    {ICONS[exp.icon]}
                  </div>

                  <div className="experience-card__top">
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noreferrer"
                      className="experience-card__icon"
                      aria-label={`Visit the ${exp.org} website`}
                    >
                      {ICONS[exp.icon]}
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
                    {exp.summary && <p className="experience-card__summary">{exp.summary}</p>}

                    <div className="experience-card__tags">
                      {exp.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>

                    <div className="experience-card__body">
                      <ul className="experience-card__list" id={panelId}>
                        {shown.map((bullet, i) => (
                          <li key={i} className="experience-card__bullet-item">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {hidden > 0 && (
                      <button
                        type="button"
                        className="experience-card__more"
                        onClick={() => toggle(idx)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        <span>{isOpen ? 'Show less' : `Show all ${exp.bullets.length} highlights`}</span>
                        <svg
                          className="experience-card__chev"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
