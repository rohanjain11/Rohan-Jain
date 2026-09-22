import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)

    if (!root.classList.contains('theme-switching')) return

    /* Drop the suppression only once the browser has painted the new theme.
       Two frames: the first is the paint that applies the new variables, the
       second is safely after it. Removing it in the same tick would let the
       transitions run on the values they were about to animate anyway. */
    const drop = () => root.classList.remove('theme-switching')
    const id = requestAnimationFrame(() => requestAnimationFrame(drop))
    /* rAF does not fire in a backgrounded tab, which would leave the class on
       and the site running without transitions until the tab is shown again.
       Harmless (no motion is the safe direction, not hidden content) but a
       timer clears it regardless. */
    const t = setTimeout(drop, 120)
    return () => {
      cancelAnimationFrame(id)
      clearTimeout(t)
      drop()
    }
  }, [theme])

  const toggleTheme = () => {
    /* Suppress transitions for the flip. Every colour here comes from a custom
       property, and those change instantly, but 53 rules transition the
       properties that read them while `body` transitions nothing. So the page
       background snapped to the new theme while the nav, the cards and the
       brand mark eased over ~300ms, and for that beat the site looked broken:
       a white page under a dark bar, with the RJ monogram white on white.
       Flipping with transitions off makes it atomic. */
    document.documentElement.classList.add('theme-switching')
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return [theme, toggleTheme]
}
