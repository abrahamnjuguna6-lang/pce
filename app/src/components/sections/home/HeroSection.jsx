import { useRef, useState, useEffect, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/common/ParticleBackground"
import { heroContainer, heroItem } from "@/lib/animations"

// ─── Service nodes ────────────────────────────────────────────────────────────
const SERVICES = [
  { id: "web",         icon: "terminal",         label: "Website Dev",      desc: "High-performance websites and client portals.",          orbit: 0, phase: 0,              color: "#2563eb" },
  { id: "systems",     icon: "settings_suggest", label: "Business Systems", desc: "Custom ERP, dashboards, and internal tools.",             orbit: 0, phase: Math.PI,       color: "#2563eb" },
  { id: "automation",  icon: "auto_mode",        label: "Automation",       desc: "Workflows that run 24/7 without human input.",            orbit: 1, phase: Math.PI * 0.3, color: "#00d2fd" },
  { id: "ai",          icon: "psychology",       label: "AI & Agents",      desc: "Intelligent assistants trained on your data.",            orbit: 1, phase: Math.PI * 1.3, color: "#00d2fd" },
  { id: "data",        icon: "analytics",        label: "Data Dashboards",  desc: "Real-time KPI dashboards and business intelligence.",     orbit: 2, phase: Math.PI * 0.6, color: "#4edea3" },
  { id: "integration", icon: "hub",              label: "Integration",      desc: "Connect your entire software stack into one ecosystem.",  orbit: 2, phase: Math.PI * 1.6, color: "#4edea3" },
]

// Orbit speeds and tilt ratios (ry/rx gives the "perspective" tilt feel)
const ORBIT_DEFS = [
  { speedMul: 0.38,  ry_rx: 0.41, color: [37,  99,  235] },
  { speedMul: -0.24, ry_rx: 0.41, color: [0,   210, 253] },
  { speedMul: 0.17,  ry_rx: 0.41, color: [78,  222, 163] },
]
const ORBIT_RADII = [0.185, 0.275, 0.365] // rx as fraction of min(w,h)

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

// ─── Canvas draw ──────────────────────────────────────────────────────────────
function drawOrrery(ctx, w, h, t, hoveredOrbitIdx) {
  ctx.clearRect(0, 0, w, h)
  const cx = w * 0.46
  const cy = h * 0.50
  const S  = Math.min(w, h)

  // Build orbit objects
  const orbits = ORBIT_DEFS.map((def, i) => ({
    rx:    S * ORBIT_RADII[i],
    ry:    S * ORBIT_RADII[i] * def.ry_rx,
    speed: def.speedMul,
    color: def.color,
  }))

  // Calculate node positions
  const nodePositions = SERVICES.map(svc => {
    const o = orbits[svc.orbit]
    const angle = svc.phase + t * o.speed
    return { ...svc, x: cx + o.rx * Math.cos(angle), y: cy + o.ry * Math.sin(angle) }
  })

  // ── Orbit rings ──────────────────────────────────────────────────────────
  orbits.forEach((o, i) => {
    const [r, g, b] = o.color
    const isActive  = hoveredOrbitIdx === i
    const dashOff   = -t * Math.abs(o.speed) * 55 * Math.sign(o.speed)

    // Ghost (always-visible faint) ring
    ctx.beginPath()
    ctx.ellipse(cx, cy, o.rx, o.ry, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${r},${g},${b},${isActive ? 0.22 : 0.09})`
    ctx.lineWidth   = isActive ? 1.4 : 0.9
    ctx.setLineDash([])
    ctx.stroke()

    // Animated dashed ring
    ctx.beginPath()
    ctx.ellipse(cx, cy, o.rx, o.ry, 0, 0, Math.PI * 2)
    ctx.strokeStyle  = `rgba(${r},${g},${b},${isActive ? 0.75 : 0.38})`
    ctx.lineWidth    = isActive ? 1.1 : 0.7
    ctx.setLineDash([7, 13])
    ctx.lineDashOffset = dashOff
    ctx.stroke()
    ctx.setLineDash([])
  })

  // ── Orb outer glow (pulsing) ─────────────────────────────────────────────
  const pulseR = S * 0.10 + Math.sin(t * 0.85) * S * 0.013
  const glow   = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseR * 2.4)
  glow.addColorStop(0,    "rgba(37,99,235,0.42)")
  glow.addColorStop(0.45, "rgba(0,210,253,0.18)")
  glow.addColorStop(1,    "transparent")
  ctx.beginPath()
  ctx.arc(cx, cy, pulseR * 2.4, 0, Math.PI * 2)
  ctx.fillStyle = glow
  ctx.fill()

  // ── Orb core (radial-gradient sphere) ────────────────────────────────────
  const orbR = S * 0.058
  const core = ctx.createRadialGradient(
    cx - orbR * 0.30, cy - orbR * 0.30, orbR * 0.04,
    cx, cy, orbR,
  )
  core.addColorStop(0,    "#b8ecff")
  core.addColorStop(0.22, "#00d2fd")
  core.addColorStop(0.58, "#2563eb")
  core.addColorStop(1,    "#0a1540")
  ctx.beginPath()
  ctx.arc(cx, cy, orbR, 0, Math.PI * 2)
  ctx.fillStyle = core
  ctx.fill()

  // Specular highlight
  const spec = ctx.createRadialGradient(
    cx - orbR * 0.42, cy - orbR * 0.42, 0,
    cx - orbR * 0.20, cy - orbR * 0.20, orbR * 0.55,
  )
  spec.addColorStop(0,   "rgba(255,255,255,0.28)")
  spec.addColorStop(1,   "transparent")
  ctx.beginPath()
  ctx.arc(cx, cy, orbR, 0, Math.PI * 2)
  ctx.fillStyle = spec
  ctx.fill()

  // ── Rotating inner arcs ──────────────────────────────────────────────────
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(t * 0.52)
  ctx.beginPath()
  ctx.arc(0, 0, orbR + S * 0.013, 0.25, Math.PI * 1.72)
  ctx.strokeStyle = "rgba(255,255,255,0.22)"
  ctx.lineWidth   = 1.4
  ctx.stroke()
  ctx.restore()

  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(-t * 0.36)
  ctx.beginPath()
  ctx.arc(0, 0, orbR + S * 0.024, Math.PI * 0.55, Math.PI * 1.25)
  ctx.strokeStyle = "rgba(0,210,253,0.32)"
  ctx.lineWidth   = 1.0
  ctx.stroke()
  ctx.restore()

  // ── Node glow halos (soft, drawn behind DOM icons) ───────────────────────
  nodePositions.forEach(node => {
    const [r, g, b] = hexToRgb(node.color)
    const haloR = S * 0.038
    const halo  = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, haloR)
    halo.addColorStop(0,   `rgba(${r},${g},${b},0.55)`)
    halo.addColorStop(1,   "transparent")
    ctx.beginPath()
    ctx.arc(node.x, node.y, haloR, 0, Math.PI * 2)
    ctx.fillStyle = halo
    ctx.fill()
  })

  return { cx, cy, orbits, nodePositions }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const navigate = useNavigate()
  const sectionRef  = useRef(null)
  const orreryRef   = useRef(null) // motion.div wrapping the orbital canvas
  const canvasRef   = useRef(null)
  const ctxRef      = useRef(null)
  const canvasDim   = useRef({ w: 0, h: 0 })
  const animRef     = useRef(null)
  const nodeEls     = useRef([])   // DOM refs to node divs
  const tooltipEl   = useRef(null) // DOM ref for tooltip position
  const hoveredSvcRef = useRef(null)

  const [tooltip, setTooltip] = useState(null) // { label, desc, color } | null

  // ── Mouse parallax ──────────────────────────────────────────────────────
  const rawMX = useMotionValue(0)
  const rawMY = useMotionValue(0)
  const springCfg = { stiffness: 38, damping: 18, mass: 1 }
  const tiltY = useSpring(useTransform(rawMX, [0, 1], [-4.5, 4.5]), springCfg)
  const tiltX = useSpring(useTransform(rawMY, [0, 1], [3.5, -3.5]),  springCfg)

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    rawMX.set((e.clientX - rect.left) / rect.width)
    rawMY.set((e.clientY - rect.top)  / rect.height)
  }, [rawMX, rawMY])

  // ── Scroll fade ─────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const orbScale   = useTransform(scrollYProgress, [0, 0.45], [1,   0.6])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.35], [1,   0])

  // ── Canvas setup + rAF loop ─────────────────────────────────────────────
  useEffect(() => {
    const setupCanvas = () => {
      if (!canvasRef.current || !orreryRef.current) return
      const dpr = window.devicePixelRatio || 1
      const w   = orreryRef.current.offsetWidth
      const h   = orreryRef.current.offsetHeight
      canvasRef.current.width  = w * dpr
      canvasRef.current.height = h * dpr
      ctxRef.current = canvasRef.current.getContext("2d")
      ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0)
      canvasDim.current = { w, h }
    }

    setupCanvas()
    window.addEventListener("resize", setupCanvas)

    const loop = (timestamp) => {
      const t = timestamp / 1000
      if (ctxRef.current && canvasDim.current.w > 0) {
        const { w, h } = canvasDim.current
        const hoveredOrbitIdx = SERVICES.find(s => s.id === hoveredSvcRef.current)?.orbit ?? -1
        const { cx, cy, orbits, nodePositions } = drawOrrery(
          ctxRef.current, w, h, t, hoveredOrbitIdx,
        )

        // Update node DOM positions (no React re-render)
        nodePositions.forEach((node, i) => {
          const el = nodeEls.current[i]
          if (el) {
            el.style.left = `${node.x}px`
            el.style.top  = `${node.y}px`
          }
        })

        // Update tooltip DOM position
        if (tooltipEl.current && hoveredSvcRef.current) {
          const hovIdx = SERVICES.findIndex(s => s.id === hoveredSvcRef.current)
          if (hovIdx !== -1) {
            const np = nodePositions[hovIdx]
            tooltipEl.current.style.left      = `${np.x - 88}px`   // half tooltip width
            tooltipEl.current.style.top       = `${np.y - 106}px`  // above node
            tooltipEl.current.style.transform = "none"
          }
        }
      }
      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", setupCanvas)
    }
  }, [])

  // ── Node hover handlers ─────────────────────────────────────────────────
  const handleNodeEnter = (svc) => {
    hoveredSvcRef.current = svc.id
    setTooltip(svc)
  }
  const handleNodeLeave = () => {
    hoveredSvcRef.current = null
    setTooltip(null)
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#0d1117]"
      onMouseMove={handleMouseMove}
    >
      {/* Kinetic gradient beneath particles so dots are always visible */}
      <div className="absolute inset-0 kinetic-gradient opacity-60 pointer-events-none" />
      {/* Particle field — z-[1] so it sits above gradient, below content */}
      <ParticleBackground className="z-[1]" />

      {/* ── MOBILE layout (< lg) ───────────────────────────────────────── */}
      <div className="lg:hidden relative z-10 min-h-screen flex items-center justify-center px-8 pt-24">
        <motion.div
          className="text-center max-w-md"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={heroItem} className="flex items-center justify-center gap-3 mb-6">
            <span className="data-pulse-dot" />
            <span className="text-[var(--pce-cyan)] font-label tracking-widest text-xs uppercase">
              Next-Gen Systems Engineering
            </span>
          </motion.div>
          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-5xl font-headline font-bold tracking-tighter leading-[0.92] text-foreground mb-5"
          >
            Intelligent Systems for{" "}
            <span className="text-primary">Modern Business.</span>
          </motion.h1>
          <motion.p variants={heroItem} className="text-sm text-muted-foreground mb-8 leading-relaxed">
            AI, automation, and custom software that transforms how you work.
          </motion.p>
          <motion.div variants={heroItem} className="flex flex-col gap-3 items-center">
            <Button asChild size="lg" className="w-full max-w-xs">
              <Link to="/contact">Start a Project</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full max-w-xs">
              <Link to="/contact">Book Consultation</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── DESKTOP layout (>= lg) ─────────────────────────────────────── */}
      <div className="hidden lg:flex relative z-10 min-h-screen items-stretch">

        {/* Left text column */}
        <motion.div
          className="w-[38%] shrink-0 flex flex-col justify-center pl-8 lg:pl-10 xl:pl-14 pr-6 pt-20"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={heroItem} className="flex items-center gap-3 mb-6">
            <span className="data-pulse-dot" />
            <span className="text-[var(--pce-cyan)] font-label tracking-widest text-xs uppercase">
              Next-Gen Systems Engineering
            </span>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-headline font-bold tracking-tighter leading-[0.90] text-foreground mb-5"
          >
            Intelligent<br />Systems for<br />
            <span className="text-primary">Modern Business.</span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-sm lg:text-sm xl:text-base text-muted-foreground leading-relaxed mb-8 max-w-xs xl:max-w-sm"
          >
            AI, automation, and custom software that transforms how you work — 24/7.
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-col gap-3 max-w-xs xl:max-w-sm">
            <Button asChild size="lg">
              <Link to="/contact">Start a Project</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Book Consultation</Link>
            </Button>
          </motion.div>

          <motion.p
            variants={heroItem}
            className="mt-8 text-xs text-muted-foreground/60 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm text-[var(--pce-cyan)]/60">
              touch_app
            </span>
            Hover a node · Click to explore services
          </motion.p>
        </motion.div>

        {/* Right orbital canvas */}
        <div className="flex-1 relative" style={{ perspective: "1200px" }}>
          <motion.div
            ref={orreryRef}
            className="absolute inset-0"
            style={{
              rotateX:  tiltX,
              rotateY:  tiltY,
              scale:    orbScale,
              opacity:  orbOpacity,
            }}
          >
            {/* Canvas — draws orb, rings, node halos */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none"
              style={{ width: "100%", height: "100%" }}
            />

            {/* Service node DOM elements — positioned via rAF, zero re-renders */}
            {SERVICES.map((svc, i) => (
              <div
                key={svc.id}
                ref={(el) => { nodeEls.current[i] = el }}
                className="absolute pointer-events-auto"
                style={{ left: "46%", top: "50%" }}
                onMouseEnter={() => handleNodeEnter(svc)}
                onMouseLeave={handleNodeLeave}
                onClick={() => navigate("/services")}
              >
                <motion.div
                  className="w-11 h-11 rounded-full border-2 flex items-center justify-center cursor-pointer"
                  style={{
                    background:  svc.color + "1a",
                    borderColor: svc.color + "70",
                    translateX:  "-50%",
                    translateY:  "-50%",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay:    0.8 + i * 0.13,
                    duration: 0.55,
                    ease:     [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    scale:       1.55,
                    borderColor: svc.color,
                    background:  svc.color + "33",
                    boxShadow:   `0 0 22px ${svc.color}80`,
                  }}
                  whileTap={{ scale: 1.2 }}
                >
                  <span
                    className="material-symbols-outlined text-base pointer-events-none"
                    style={{ color: svc.color }}
                  >
                    {svc.icon}
                  </span>
                </motion.div>
              </div>
            ))}

            {/* Tooltip — content via React state, position via DOM ref */}
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  ref={tooltipEl}
                  className="absolute z-20 pointer-events-none w-44 bg-pce-surface-container border border-pce-outline-variant/30 rounded-xl p-3.5 shadow-2xl"
                  style={{ left: "46%", top: "30%" }}
                  initial={{ opacity: 0, y: 10, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0,  scale: 1 }}
                  exit={{    opacity: 0, y: 6,  scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="flex items-center gap-2 mb-1.5"
                  >
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ color: tooltip.color }}
                    >
                      {tooltip.icon}
                    </span>
                    <p className="text-xs font-bold text-foreground">{tooltip.label}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{tooltip.desc}</p>
                  {/* Arrow */}
                  <div
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-pce-surface-container border-r border-b border-pce-outline-variant/30"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
