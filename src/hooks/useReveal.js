import { useEffect, useRef } from 'react'

/**
 * Reveal-on-scroll, written so it can only ever ADD polish - never hide content.
 *
 * The earlier version set opacity to 0 and relied entirely on an
 * IntersectionObserver to put it back. Anything that stopped the observer or
 * froze the transition (a backgrounded tab throttling animations, an observer
 * that never fires for an element laid out off-screen, a JS error higher up)
 * left the card permanently invisible. On a portfolio that is the worst
 * possible failure, so there are now three independent ways to become visible.
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const show = () => element.classList.add('visible')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      show()
      return
    }

    // 1. Already on screen at mount (or no observer support): show immediately.
    if (typeof IntersectionObserver === 'undefined') {
      show()
      return
    }
    const box = element.getBoundingClientRect()
    if (box.top < window.innerHeight && box.bottom > 0) show()

    // 2. The normal path.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(element)

    // 3. Backstop: whatever happened above, never stay hidden past 1.5s. This
    //    path also drops the transition, because a frozen transition (hidden
    //    tab, throttled rAF) is one of the ways content gets stuck part-faded.
    const failSafe = setTimeout(() => {
      element.style.transition = 'none'
      show()
    }, 1500)

    return () => {
      clearTimeout(failSafe)
      observer.disconnect()
    }
  }, [])

  return ref
}
