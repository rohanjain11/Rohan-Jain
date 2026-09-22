import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { SKILLS } from '../data/content'
import ParticleBackground from '../components/ParticleBackground'
import SkillIcon from '../components/SkillIcon'

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/** "Databricks (Unity Catalog, ...)" -> name + detail. Presentation only; content.js is untouched. */
function splitLabel(raw) {
  const m = raw.match(/^([^(]+?)\s*\(([^)]*)\)\s*$/)
  return m ? { name: m[1], detail: m[2] } : { name: raw, detail: null }
}

/**
 * One category, full width. The craters came from pairing a 19-item category
 * beside a 6-item one in a 2-up grid; nothing here is paired, so nothing can
 * crater.
 *
 * No `reveal` class on the chips. `.reveal` is opacity 0 until an observer
 * fires, and this page has already been bitten twice by content that depended
 * on an animation to become visible. The chips are in normal flow, visible on
 * first paint, and only their transform is animated.
 */
function SkillBand({ title, items }) {
  const id = slug(title)
  return (
    <section className="wall-band" id={`cat-${id}`} aria-labelledby={`h-${id}`}>
      <div className="wall-band__rail">
        <h2 className="wall-band__title" id={`h-${id}`}>{title}</h2>
        <p className="wall-band__count">{items.length} tools</p>
      </div>
      <ul className="wall">
        {items.map((raw, i) => {
          const { name, detail } = splitLabel(raw)
          return (
            <li className="wall__chip" key={raw} style={{ '--i': i }}>
              <SkillIcon name={raw} />
              <span className="wall__label">
                <span className="wall__name">{name}</span>
                {detail && <span className="wall__detail">{detail}</span>}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* Decorative only. Pulled from SKILLS by index so the ribbon can never drift
   into carrying a skill that is not also in the wall below. */
const RIBBON = [
  SKILLS['LLM and Agents'][0], SKILLS['LLM and Agents'][2], SKILLS['Languages'][0],
  SKILLS['Backend and Data'][0], SKILLS['Machine Learning'][9], SKILLS['Backend and Data'][10],
  SKILLS['Backend and Data'][11], SKILLS['Frontend, Cloud and Observability'][0],
  SKILLS['Machine Learning'][7], SKILLS['Backend and Data'][7], SKILLS['LLM and Agents'][8],
  SKILLS['Frontend, Cloud and Observability'][7],
]

export default function Skills() {
  const skillKeys = Object.keys(SKILLS)

  /* This route is lazy-loaded, so on a cold load of /skills#cat-machine-learning
     the browser looks for the target before the chunk has mounted it, finds
     nothing, and stays at the top. Re-run the jump once we exist. In-page
     clicks already work; this is only the cold-load and refresh path. */
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    /* behavior 'auto', not the inherited smooth: a smooth scroll is animated,
       and the layout shift as the rest of the page settles cancels it midway,
       which is why the first version of this landed back at scrollY 0. Jump
       once now and once after layout settles, so a late shift cannot strand us. */
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: 'auto' })
    jump()
    const t = setTimeout(jump, 150)
    return () => clearTimeout(t)
  }, [])
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
          <div className="ribbon" aria-hidden="true">
            <div className="ribbon__track">
              {/* Icons only, no text. aria-hidden stops a screen reader, but
                  find-in-page ignores it entirely, so rendering the names here
                  put the first two Ctrl+F hits for Kubernetes, Python, React
                  and Databricks inside a clipped track the reader cannot see.
                  Marks carry no searchable text, so the problem disappears. */}
              {[0, 1].map((copy) =>
                RIBBON.map((raw) => (
                  <span className="ribbon__item" key={`${copy}-${raw}`}>
                    <SkillIcon name={raw} />
                  </span>
                ))
              )}
            </div>
          </div>

          <nav className="wall-jump" aria-label="Skill categories">
            {skillKeys.map((k) => (
              <a className="wall-jump__link" key={k} href={`#cat-${slug(k)}`}>
                {k}
                <span className="wall-jump__n">{SKILLS[k].length}</span>
              </a>
            ))}
          </nav>

          <div className="skill-wall">
            {skillKeys.map((k) => (
              <SkillBand key={k} title={k} items={SKILLS[k]} />
            ))}
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
