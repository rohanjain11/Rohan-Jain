import { BRANDS, GLYPHS, ICON_FOR } from '../data/skill-icons'

/**
 * One 24x24 mark for a skill.
 *
 * Brand marks are fill paths, concept glyphs are stroke paths, and the prefix
 * on the map key decides which. Rendering one as the other produces an
 * unreadable blob, so the two tables stay separate rather than merged.
 *
 * There is deliberately no empty branch: an unmapped skill falls back to a
 * monogram tile. A blank icon slot would put a small hole in every chip, which
 * is the class of problem this page exists to remove.
 */
export default function SkillIcon({ name }) {
  const key = ICON_FOR[name]
  const [kind, id] = key ? key.split(':') : []
  const d = kind === 'b' ? BRANDS[id] : kind === 'g' ? GLYPHS[id] : null

  if (!d) {
    return (
      <span className="wall__mono" aria-hidden="true">
        {name.trim().charAt(0).toUpperCase()}
      </span>
    )
  }

  return (
    <svg
      className="wall__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={kind === 'b' ? 'currentColor' : 'none'}
      stroke={kind === 'b' ? 'none' : 'currentColor'}
      strokeWidth={kind === 'b' ? undefined : 1.6}
      strokeLinecap={kind === 'b' ? undefined : 'round'}
      strokeLinejoin={kind === 'b' ? undefined : 'round'}
    >
      <path d={d} />
    </svg>
  )
}
