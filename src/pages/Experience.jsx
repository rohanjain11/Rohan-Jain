import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useReveal } from '../hooks/useReveal'
import { EXPERIENCE } from '../data/content'
import ParticleBackground from '../components/ParticleBackground'

/** Fallback preview size for a role that does not name its own headline points. */
const PREVIEW_COUNT = 3

/**
 * A collapsed card should lead with the points worth reading, not with whatever
 * happens to sit at the top of the array. `previewIdx` in content.js names them;
 * the rest follow in their original order once the card is open, so expanding
 * adds to what you were reading instead of reshuffling it.
 */
function orderBullets(exp) {
  const all = exp.bullets.map((_, i) => i)
  const lead = exp.previewIdx ?? all.slice(0, PREVIEW_COUNT)
  const rest = all.filter((i) => !lead.includes(i))
  return { ordered: [...lead, ...rest].map((i) => exp.bullets[i]), leadCount: lead.length }
}

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
  /* Cards stay collapsed to a scannable overview; the full list opens in a
     dialog instead of growing the card. Expanding in place made a 2000px card
     whose text sat in a narrow column with the right half of the row empty,
     and pushed everything below it far down the page. */
  const [openIdx, setOpenIdx] = useState(null)
  const dialogRef = useRef(null)
  const openerRef = useRef(null)
  const open = openIdx !== null ? EXPERIENCE[openIdx] : null

  const close = () => {
    setOpenIdx(null)
    /* Send focus back where it came from, or a keyboard user is dumped at the
       top of the document. */
    if (openerRef.current) openerRef.current.focus()
  }

  useEffect(() => {
    if (openIdx === null) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    /* html AND body. index.css sets `html, body { overflow-x: hidden }`, so the
       root's overflow is not `visible` and the viewport stops taking its
       overflow from <body>: document.scrollingElement is <html>, and locking
       body alone leaves the page free to scroll behind the overlay. Measured
       before this: open the dialog at scrollY 1500, scroll to 3000, close, and
       the reader is 1500px away from the card they tapped. */
    const prevBody = document.body.style.overflow
    const prevHtml = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = prevBody
      document.documentElement.style.overflow = prevHtml
      document.removeEventListener('keydown', onKey)
    }
  }, [openIdx])

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
              const { ordered, leadCount } = orderBullets(exp)
              const shown = ordered.slice(0, leadCount)
              const hidden = exp.bullets.length - leadCount

              return (
                <article
                  key={idx}
                  /* className stays STATIC on purpose. useReveal adds `visible`
                     imperatively via classList; if React also owned this
                     attribute it would overwrite that class on every re-render
                     and the card would snap back to opacity 0 the moment you
                     expanded it. Open state travels as a data attribute. */
                  className="experience-card reveal"
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
                      <ul className="experience-card__list">
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
                        onClick={(e) => { openerRef.current = e.currentTarget; setOpenIdx(idx) }}
                        aria-haspopup="dialog"
                      >
                        <span>{`Show all ${exp.bullets.length} highlights`}</span>
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
                          <polyline points="9 18 15 12 9 6" />
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

      {/* Portalled to <body>. Layout renders <main style={{position:'relative',
          zIndex:1}}>, which is a stacking context: inside it the dialog's
          z-index 1100 is still trapped under the fixed nav at 1000, and the
          nav painted over the dialog header. */}
      {open && createPortal(
        <div className="exp-modal" onClick={close}>
          <div
            className="exp-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exp-modal-title"
            tabIndex={-1}
            ref={dialogRef}
            /* The backdrop closes on click; the panel must not pass its own
               clicks up to it. */
            onClick={(e) => e.stopPropagation()}
          >
            <header className="exp-modal__head">
              <div className="exp-modal__heading">
                <h2 className="exp-modal__title" id="exp-modal-title">{open.org}</h2>
                <p className="exp-modal__role">{open.title}</p>
                <p className="exp-modal__meta">
                  <span className="experience-card__date">{open.dates}</span>
                  <span className="experience-card__location">{open.location}</span>
                </p>
              </div>
              <button
                type="button"
                className="exp-modal__close"
                onClick={close}
                aria-label={`Close ${open.org} highlights`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </header>

            <div className="exp-modal__body">
              {open.summary && <p className="experience-card__summary">{open.summary}</p>}

              <div className="experience-card__tags">
                {open.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              <ul className="exp-modal__list">
                {orderBullets(open).ordered.map((bullet, i) => (
                  <li key={i} className="experience-card__bullet-item">{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
