import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useScroll } from '../hooks/useScroll'
import { SITE } from '../data/content'

export default function Nav() {
  const location = useLocation()
  const [theme, toggleTheme] = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const scrolled = useScroll()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
    { path: '/education', label: 'Education' },
    { path: '/contact', label: 'Contact' },
  ]

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  /* Lock the page behind the panel and let Escape close it. Without the lock,
     dragging on the dimmed backdrop scrolls the page underneath, which reads as
     the menu being broken. */
  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false) }
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
    return () => {
      document.body.style.overflow = prevBody
      document.documentElement.style.overflow = prevHtml
      document.removeEventListener('keydown', onKey)
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = event.target.closest('.nav')
      const navLinks = event.target.closest('.nav__links')
      if (mobileMenuOpen && !navLinks && !event.target.closest('.nav__toggle')) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Outside <nav> on purpose. .nav carries backdrop-filter, and a filter or
          backdrop-filter makes an element the containing block for its
          position:fixed descendants, so in there this clamped to the 64px bar
          instead of covering the viewport. */}
      {mobileMenuOpen && (
        <div
          className="nav__backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} aria-label="Primary">
      <div className="container nav__inner">
        <Link className="brand" to="/" onClick={() => setMobileMenuOpen(false)}>
          <span className="brand__mark">
            <span className="brand__mark-text">RJ</span>
          </span>
          <span>{SITE.name}</span>
        </Link>

        <button
          className="nav__toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`nav__links ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              className={`nav__link ${location.pathname === link.path ? 'active' : ''}`}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav__actions">
          <button
            className="btn btn--ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          {/* No `download` attribute: that forced a save instead of a view, and a
              recruiter wants to read the thing, not manage a file. GitHub Pages
              serves it as application/pdf with no Content-Disposition, so the
              browser renders it inline. Opens in a new tab so the portfolio
              stays put behind it. */}
          <a
            className="btn btn--primary"
            href={SITE.ctas.resumeMaster.href}
            target="_blank"
            rel="noreferrer"
            style={{ minWidth: '100px' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Resume
          </a>
        </div>
      </div>
      </nav>
    </>
  )
}
