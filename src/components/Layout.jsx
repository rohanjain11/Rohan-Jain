import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout({ children }) {
  const location = useLocation()

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
