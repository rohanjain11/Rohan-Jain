import { useEffect } from 'react'

/* Module-level, deliberately: the count and the saved values must be shared by
   every caller. */
let holders = 0
let saved = null

/**
 * Locks page scroll while `active`, safely when more than one overlay wants it.
 *
 * The menu and the experience dialog each used to snapshot and restore the
 * overflow styles themselves. Open the dialog, then the menu, and the menu's
 * snapshot captured `hidden` rather than the empty string, so closing both
 * wrote `hidden` back and left the page permanently unscrollable. Nav never
 * unmounts, so no client-side navigation cleared it; only a reload did.
 *
 * Counting fixes that: the first holder saves the real values and locks, the
 * last one out restores them, and anyone in between changes nothing.
 *
 * Both <html> and <body>: index.css sets `html, body { overflow-x: hidden }`,
 * so the root's overflow is not `visible`, the viewport stops taking its
 * overflow from <body>, and locking body alone does nothing.
 */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return

    if (holders++ === 0) {
      saved = {
        html: document.documentElement.style.overflow,
        body: document.body.style.overflow,
      }
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    }

    return () => {
      if (--holders === 0 && saved) {
        document.documentElement.style.overflow = saved.html
        document.body.style.overflow = saved.body
        saved = null
      }
    }
  }, [active])
}
