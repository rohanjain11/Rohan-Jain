import { useEffect, useRef } from 'react'

/**
 * The drifting constellation behind every page. Atmosphere, never content.
 *
 * Four things were wrong here and they compounded:
 *   - The canvas had no className, so `.particle-bg { opacity: 0.45 }` in
 *     index.css had never matched it. The field drew at full strength behind
 *     the hero and page subtitles, the only text on the site with no opaque
 *     card behind it, at almost exactly their tonal value.
 *   - The rAF loop was unconditional. A CSS prefers-reduced-motion block cannot
 *     reach a 2D context, so this was the one place on the site that ignored it,
 *     and it also meant a never-idle 60fps loop on battery.
 *   - The resize listener was an anonymous arrow while the cleanup removed a
 *     different reference, so every route mounted a handler that was never
 *     detached.
 *   - The bitmap was sized from innerWidth with no devicePixelRatio, so on a
 *     phone every dot and line was upscaled from a third of native resolution.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    let themeObserver

    /* Layout maths stays in CSS pixels (cw/ch); the bitmap is scaled by DPR and
       the context transformed to match, so the drawing code below needs no unit
       conversion. Capped at 2: a 3x phone gains nothing visible at this size and
       pays triple the fill cost. */
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2)
    let cw = 0
    let ch = 0

    const resize = () => {
      const d = dpr()
      const r = canvas.getBoundingClientRect()
      cw = r.width
      ch = r.height
      canvas.width = Math.round(cw * d)
      canvas.height = Math.round(ch * d)
      ctx.setTransform(d, 0, 0, d, 0, 0)
    }

    const createParticle = () => ({
      x: Math.random() * cw,
      y: Math.random() * ch,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    })

    const init = () => {
      particles = []
      const particleCount = Math.floor((cw * ch) / 15000)
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle())
      }
    }

    const still = window.matchMedia('(prefers-reduced-motion: reduce)')

    const draw = () => {
      ctx.clearRect(0, 0, cw, ch)

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = cw
        if (particle.x > cw) particle.x = 0
        if (particle.y < 0) particle.y = ch
        if (particle.y > ch) particle.y = 0

        const isLight = document.documentElement.getAttribute('data-theme') === 'light'
        const particleColor = isLight ? '0, 0, 0' : '255, 255, 255'

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`
        ctx.fill()

        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(${particleColor}, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      /* The only place reduced motion can be honoured for a canvas. */
      if (!still.matches) animationFrameId = requestAnimationFrame(draw)
    }

    const start = () => {
      cancelAnimationFrame(animationFrameId)
      resize()
      init()
      /* Reduced motion gets a STILL field, not a blank one: the atmosphere
         stays, it just stops drifting. */
      if (still.matches) particles.forEach((p) => { p.vx = 0; p.vy = 0 })
      draw()
    }

    /* Named, so the cleanup can actually remove it. A height-only change is the
       mobile URL bar collapsing mid-scroll; re-init()ing there re-randomises
       every particle and the whole constellation visibly teleports. Only a
       width change rebuilds the field. */
    let lastW = window.innerWidth
    const onResize = () => {
      resize()
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth
        init()
      }
    }

    start()
    window.addEventListener('resize', onResize)
    still.addEventListener('change', start)

    /* With motion stopped there is no next frame to pick up the new colour, so
       a theme switch has to paint one itself. */
    themeObserver = new MutationObserver(() => {
      if (still.matches) draw()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', onResize)
      still.removeEventListener('change', start)
      if (themeObserver) themeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-bg"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
