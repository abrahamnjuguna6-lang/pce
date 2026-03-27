import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const MotionLink = motion(Link)

// ─── Data ──────────────────────────────────────────────────────────────────
const MORPH_TEXTS = ["for Business.", "for Scale.", "for the Future.", "for Every Industry."]

const ORBIT_NODES = [
  { label: "AI",    rx: 0.32, speed: 0.0008, color: "#00d2fd", phase: 0             },
  { label: "Data",  rx: 0.42, speed: 0.0006, color: "#00d2fd", phase: Math.PI * 0.7 },
  { label: "Cloud", rx: 0.52, speed: 0.0004, color: "#2563eb", phase: Math.PI * 1.3 },
  { label: "API",   rx: 0.22, speed: 0.001,  color: "#2563eb", phase: Math.PI * 0.3 },
  { label: "Dev",   rx: 0.60, speed: 0.0007, color: "#00d2fd", phase: Math.PI * 1.8 },
]

const SERVICE_TAGS = [
  { label: "AI Automation",    pos: { top: "18%", left: "5%" },  delay: 0.9  },
  { label: "Cloud Infra",      pos: { top: "32%", right: "0%" }, delay: 1.05 },
  { label: "Custom Software",  pos: { top: "62%", left: "2%" },  delay: 1.15 },
  { label: "API Integration",  pos: { top: "75%", right: "5%" }, delay: 1.25 },
  { label: "Data Engineering", pos: { top: "50%", right: "2%" }, delay: 1.35 },
]

const STATS = [
  { number: "150", suffix: "+", label: "Projects Shipped"  },
  { number: "99",  suffix: "%", label: "Uptime Guaranteed" },
  { number: "24/7",suffix: "",  label: "System Monitoring" },
]

const TICKER = "Trusted by forward-thinking businesses \u00b7 AI & Automation \u00b7 Custom Software \u00b7 Systems Integration \u00b7 24/7 Monitoring \u00b7\u00a0\u00a0\u00a0"

// ─── Animation helper ──────────────────────────────────────────────────────
const fu = (delay) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

// ─── Component ────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [morphIdx, setMorphIdx] = useState(0)
  const particleRef       = useRef(null)
  const orbitRef          = useRef(null)
  const orbitContainerRef = useRef(null)

  // Morphing headline cycle
  useEffect(() => {
    const id = setInterval(() => setMorphIdx(i => (i + 1) % MORPH_TEXTS.length), 2800)
    return () => clearInterval(id)
  }, [])

  // ── Particle canvas ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = particleRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)

    const MAX = 110
    const pts = Array.from({ length: 90 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r:  Math.random() * 1.2 + 0.3,
      a:  Math.random() * 0.5 + 0.2,
    }))

    let raf
    const tick = () => {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(0,210,253,${0.06 * (1 - d / MAX)})`
            ctx.lineWidth   = 0.5
            ctx.stroke()
          }
        }
      }
      pts.forEach(p => {
        p.x = ((p.x + p.vx) + W) % W
        p.y = ((p.y + p.vy) + H) % H
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,210,253,${p.a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  // ── Orbit canvas ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas    = orbitRef.current
    const container = orbitContainerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext("2d")
    const dpr = window.devicePixelRatio || 1
    const angles = ORBIT_NODES.map(n => n.phase)
    let lastTs = 0

    const resize = () => {
      const w = container.offsetWidth
      const h = container.offsetHeight
      if (!w || !h) return
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = w + "px"
      canvas.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    let raf
    const draw = (ts) => {
      const dt = Math.min(ts - lastTs, 50)
      lastTs = ts

      const w = container.offsetWidth
      const h = container.offsetHeight
      if (!w || !h) { raf = requestAnimationFrame(draw); return }

      ctx.clearRect(0, 0, w, h)

      const cx    = w * 0.5
      const cy    = h * 0.5
      const S     = Math.min(w, h)
      const baseR = S * 0.14

      // Ambient glow
      const glw = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.4)
      glw.addColorStop(0, "rgba(0,210,253,0.15)")
      glw.addColorStop(1, "transparent")
      ctx.beginPath()
      ctx.arc(cx, cy, baseR * 1.4, 0, Math.PI * 2)
      ctx.fillStyle = glw
      ctx.fill()

      // Orbit rings
      ;[0.22, 0.32, 0.42, 0.52, 0.60].forEach(f => {
        const rx = S * f
        const ry = rx * 0.35
        ctx.beginPath()
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(0,210,253,0.08)"
        ctx.lineWidth   = 0.5
        ctx.stroke()
      })

      // Nodes
      ORBIT_NODES.forEach((node, i) => {
        angles[i] += node.speed * dt
        const rx = S * node.rx
        const ry = rx * 0.35
        const nx = cx + rx * Math.cos(angles[i])
        const ny = cy + ry * Math.sin(angles[i])
        const [r, g, b] = node.color === "#00d2fd" ? [0, 210, 253] : [37, 99, 235]

        // Glow halo
        const halo = ctx.createRadialGradient(nx, ny, 0, nx, ny, 35)
        halo.addColorStop(0, `rgba(${r},${g},${b},0.25)`)
        halo.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(nx, ny, 35, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()

        // Node circle
        ctx.beginPath()
        ctx.arc(nx, ny, 14, 0, Math.PI * 2)
        ctx.fillStyle   = "#111318"
        ctx.fill()
        ctx.strokeStyle = node.color
        ctx.lineWidth   = 1
        ctx.stroke()

        // Label
        ctx.fillStyle     = node.color
        ctx.font          = "600 9px 'Manrope', sans-serif"
        ctx.textAlign     = "center"
        ctx.textBaseline  = "middle"
        ctx.fillText(node.label, nx, ny)
      })

      // Core sphere (drawn last — always on top)
      const sph = ctx.createRadialGradient(
        cx - baseR * 0.3, cy - baseR * 0.3, baseR * 0.1,
        cx, cy, baseR,
      )
      sph.addColorStop(0,    "#6af4ff")
      sph.addColorStop(0.45, "#2563eb")
      sph.addColorStop(1,    "#111318")
      ctx.beginPath()
      ctx.arc(cx, cy, baseR, 0, Math.PI * 2)
      ctx.fillStyle = sph
      ctx.fill()

      // Outer ring
      ctx.beginPath()
      ctx.arc(cx, cy, baseR + 4, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(0,210,253,0.3)"
      ctx.lineWidth   = 0.5
      ctx.stroke()

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  // ── Shared inline style fragments ───────────────────────────────────────
  const manrope = { fontFamily: "Manrope, sans-serif" }
  const grotesk = { fontFamily: "Space Grotesk, sans-serif" }

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", background: "#111318" }}
    >
      {/* Layer 1 — Particle canvas */}
      <canvas
        ref={particleRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0, opacity: 0.55 }}
      />

      {/* Layer 2 — Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: [
            "linear-gradient(rgba(0,210,253,0.03) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(0,210,253,0.03) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Content grid ─────────────────────────────────────────────── */}
      <div
        className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-6 sm:px-10 lg:px-[48px]"
        style={{
          zIndex: 2,
          paddingTop:    "clamp(88px, 12vh, 120px)",
          paddingBottom: 80,
          minHeight:     "100vh",
        }}
      >
        {/* ── Left Column ── */}
        <div>
          {/* Eyebrow */}
          <motion.div
            className="flex items-center"
            style={{ gap: 10, marginBottom: 28 }}
            {...fu(0.1)}
          >
            <div style={{ width: 24, height: 1, background: "#00d2fd", flexShrink: 0 }} />
            <span style={{ ...manrope, fontSize: 11, fontWeight: 500, color: "#00d2fd", textTransform: "uppercase", letterSpacing: "0.18em" }}>
              Next-Gen Systems Engineering
            </span>
          </motion.div>

          {/* Accent bar */}
          <motion.div
            style={{ width: 48, height: 3, background: "#2563eb", marginBottom: 10 }}
            {...fu(0.15)}
          />

          {/* H1 */}
          <motion.h1
            style={{ ...grotesk, fontWeight: 800, fontSize: "clamp(52px, 6vw, 84px)", lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: 24 }}
            {...fu(0.25)}
          >
            <span style={{ display: "block", color: "#e2e2e9" }}>Intelligent</span>
            <span style={{ display: "block", color: "transparent", WebkitTextStroke: "1.5px rgba(226,226,233,0.3)" }}>
              Systems
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={morphIdx}
                style={{ display: "block", color: "#00d2fd" }}
                initial={{ opacity: 0, y: 8  }}
                animate={{ opacity: 1, y: 0  }}
                exit={{    opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {MORPH_TEXTS[morphIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            style={{ ...manrope, fontSize: 13, fontWeight: 400, color: "#8d90a0", lineHeight: 1.8, maxWidth: 380, letterSpacing: "0.02em", marginBottom: 44 }}
            {...fu(0.45)}
          >
            AI, automation, and custom software that transforms how your business operates — continuously, at scale, around the clock.
          </motion.p>

          {/* Buttons */}
          <motion.div {...fu(0.6)}>
            <MotionLink
              to="/contact"
              style={{ display: "inline-block", background: "transparent", border: "1px solid #434655", color: "#e2e2e9", ...manrope, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", padding: "14px 36px", borderRadius: 8, textDecoration: "none" }}
              whileHover={{ y: -2, borderColor: "#00d2fd", color: "#00d2fd" }}
              transition={{ duration: 0.2 }}
            >
              Book Consultation
            </MotionLink>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap"
            style={{ gap: 40, marginTop: 56, borderTop: "1px solid rgba(67,70,85,0.4)", paddingTop: 32 }}
            {...fu(0.75)}
          >
            {STATS.map(({ number, suffix, label }) => (
              <div key={label}>
                <div style={{ ...grotesk, fontWeight: 800, fontSize: 28, color: "#e2e2e9", lineHeight: 1 }}>
                  {number}
                  {suffix && <span style={{ color: "#00d2fd" }}>{suffix}</span>}
                </div>
                <div style={{ ...manrope, fontSize: 10, color: "#8d90a0", textTransform: "uppercase", letterSpacing: "0.14em", marginTop: 4 }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right Column: Orbit ── */}
        <div
          ref={orbitContainerRef}
          className="relative h-[340px] sm:h-[460px] lg:h-auto lg:self-stretch"
          style={{ minHeight: 360 }}
        >
          <canvas
            ref={orbitRef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />

          {/* Floating service tags */}
          {SERVICE_TAGS.map(tag => (
            <motion.div
              key={tag.label}
              className="absolute flex items-center"
              style={{
                ...tag.pos,
                background:          "rgba(17,19,24,0.7)",
                backdropFilter:      "blur(8px)",
                WebkitBackdropFilter:"blur(8px)",
                border:              "1px solid rgba(67,70,85,0.4)",
                borderRadius:        9999,
                padding:             "6px 14px",
                ...manrope,
                fontSize:            10,
                fontWeight:          500,
                color:               "#8d90a0",
                textTransform:       "uppercase",
                letterSpacing:       "0.14em",
                gap:                 8,
                whiteSpace:          "nowrap",
                cursor:              "default",
                zIndex:              1,
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: tag.delay }}
              whileHover={{ borderColor: "#00d2fd", color: "#00d2fd" }}
            >
              <span style={{ width: 5, height: 5, background: "#00d2fd", borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
              {tag.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Status bar ─────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 hidden sm:flex items-center justify-between overflow-hidden"
        style={{
          zIndex:              3,
          background:          "rgba(17,19,24,0.6)",
          backdropFilter:      "blur(20px)",
          WebkitBackdropFilter:"blur(20px)",
          borderTop:           "1px solid rgba(67,70,85,0.4)",
          padding:             "20px 48px",
        }}
      >
        {/* Scrolling ticker */}
        <div style={{ overflow: "hidden", width: 300 }}>
          <motion.div
            style={{ ...manrope, fontSize: 10, color: "#8d90a0", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap", display: "inline-block" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          >
            {TICKER}{TICKER}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="flex items-center" style={{ gap: 12 }}>
          <span style={{ ...manrope, fontSize: 10, color: "#8d90a0", textTransform: "uppercase", letterSpacing: "0.14em" }}>
            Scroll to explore
          </span>
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, #8d90a0, transparent)" }} />
        </div>
      </div>
    </section>
  )
}
