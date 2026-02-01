import { useEffect, useRef } from 'react'

export default function AnimatedChart({ data, color = '#2563eb' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width = canvas.offsetWidth
    const height = canvas.height = canvas.offsetHeight

    const maxValue = Math.max(...data)
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2
    const barWidth = chartWidth / data.length
    const spacing = barWidth * 0.2

    let progress = 0
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      progress = Math.min(elapsed / duration, 1)
      
      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3)

      ctx.clearRect(0, 0, width, height)

      // Draw bars
      data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight * eased
        const x = padding + index * barWidth + spacing / 2
        const y = height - padding - barHeight

        // Gradient
        const gradient = ctx.createLinearGradient(0, y, 0, height - padding)
        gradient.addColorStop(0, color)
        // Create semi-transparent version for gradient end
        const colorWithAlpha = color.includes('rgba') 
          ? color.replace(/,\s*[\d.]+\)$/, ', 0.5)')
          : color.replace('rgb', 'rgba').replace(')', ', 0.5)')
        gradient.addColorStop(1, colorWithAlpha)

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth - spacing, barHeight)

        // Value label
        if (progress > 0.5) {
          const isLight = document.documentElement.getAttribute('data-theme') === 'light'
          ctx.fillStyle = isLight ? '#000000' : '#f8fafc'
          ctx.font = '12px Inter'
          ctx.textAlign = 'center'
          ctx.fillText(
            value.toFixed(0),
            x + (barWidth - spacing) / 2,
            y - 5
          )
        }
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [data, color])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '200px',
        borderRadius: '8px',
      }}
    />
  )
}
