import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout({ children }) {
  const location = useLocation()

  /* React Router keeps the document scroll position across a pushState
     navigation and nothing here reset it. Scroll /experience down, tap Contact,
     and you land on /contact already scrolled past its own title. On desktop
     the persistent nav disguises it; on a phone the whole screen is content and
     it reads as a page that failed to load.
     Skipped when a hash is present so the Skills #cat-* jump still wins.
     'instant' because html { scroll-behavior: smooth } would otherwise animate
     the old page's scroll distance while the new route paints. */
  useEffect(() => {
    if (location.hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = e.target.closest('.card, .hero__nav-card, .experience-card')
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)

    }

    const handleMouseLeave = (e) => {
      const card = e.target.closest('.card, .hero__nav-card, .experience-card')
      if (!card) return

      card.style.setProperty('--mouse-x', '50%')
      card.style.setProperty('--mouse-y', '50%')

    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [location])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
