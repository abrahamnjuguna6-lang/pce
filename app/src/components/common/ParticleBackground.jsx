import { useEffect, useRef } from "react"

/**
 * Canvas-based particle network background.
 * Particles drift slowly and draw connecting lines when close.
 */
export default function ParticleBackground({ className = "" }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    // Resize canvas to fill parent
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Particle config
    const PARTICLE_COUNT = 60
    const CONNECTION_DISTANCE = 140
    const PARTICLE_COLOR  = "rgba(0, 210, 253,"  // Neon Cyan base
    const LINE_COLOR      = "rgba(37, 99, 235,"  // Electric Blue base

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x  = Math.random() * canvas.width
        this.y  = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.r  = Math.random() * 1.8 + 0.8
        this.opacity = Math.random() * 0.5 + 0.2
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width)  this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `${PARTICLE_COLOR}${this.opacity})`
        ctx.fill()
      }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle())

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections first
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.25
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `${LINE_COLOR}${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw + update particles
      particles.forEach((p) => { p.update(); p.draw() })

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
