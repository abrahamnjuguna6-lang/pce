import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/common/ParticleBackground"

// ─── Glitch hook — random tearing on an interval ──────────────────────────────
function useGlitch() {
  const [active, setActive] = useState(false)
  useEffect(() => {
    let timeout
    const schedule = () => {
      timeout = setTimeout(() => {
        setActive(true)
        setTimeout(() => { setActive(false); schedule() }, 100 + Math.random() * 80)
      }, 2200 + Math.random() * 2800)
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [])
  return active
}

// ─── Backwards clock SVG ──────────────────────────────────────────────────────
function BackwardsClock() {
  return (
    <svg viewBox="0 0 44 44" className="w-14 h-14 opacity-60">
      <circle cx="22" cy="22" r="20" fill="none" stroke="#7f1d1d" strokeWidth="1.5" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="22" y1="4" x2="22" y2="6"
          stroke="#7f1d1d" strokeWidth="1"
          style={{ transformOrigin: "22px 22px", transform: `rotate(${deg}deg)` }}
        />
      ))}
      {/* Hour hand — rotates backwards */}
      <motion.line
        x1="22" y1="22" x2="22" y2="10"
        stroke="#ef4444" strokeWidth="2" strokeLinecap="round"
        style={{ transformOrigin: "22px 22px" }}
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      {/* Minute hand — rotates backwards faster */}
      <motion.line
        x1="22" y1="22" x2="22" y2="7"
        stroke="#ef444470" strokeWidth="1.5" strokeLinecap="round"
        style={{ transformOrigin: "22px 22px" }}
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="22" cy="22" r="1.5" fill="#ef4444" />
    </svg>
  )
}

// ─── Right panel: data flow nodes ────────────────────────────────────────────
const flowNodes = [
  { id: "a", icon: "upload_file", label: "Input",      x: "62%", y: "22%" },
  { id: "b", icon: "auto_mode",   label: "Automate",   x: "78%", y: "18%" },
  { id: "c", icon: "psychology",  label: "AI Engine",  x: "88%", y: "40%" },
  { id: "d", icon: "analytics",   label: "Analytics",  x: "72%", y: "55%" },
  { id: "e", icon: "send",        label: "Deliver",    x: "88%", y: "65%" },
]

const nodeColors = {
  a: "#2563eb", b: "#4edea3", c: "#00d2fd", d: "#2563eb", e: "#4edea3",
}

function FlowNode({ node, delay }) {
  return (
    <div className="absolute" style={{ left: node.x, top: node.y, transform: "translate(-50%,-50%)" }}>
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: `1.5px solid ${nodeColors[node.id]}` }}
        animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay }}
      />
      {/* Circle */}
      <motion.div
        className="relative w-10 h-10 rounded-full flex items-center justify-center border"
        style={{
          background: nodeColors[node.id] + "18",
          borderColor: nodeColors[node.id] + "60",
        }}
        animate={{
          boxShadow: [
            `0 0 6px ${nodeColors[node.id]}40`,
            `0 0 18px ${nodeColors[node.id]}80`,
            `0 0 6px ${nodeColors[node.id]}40`,
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        whileInViewTransition={{ delay: delay + 0.3, duration: 0.5 }}
      >
        <motion.span
          className="material-symbols-outlined text-base"
          style={{ color: nodeColors[node.id] }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay }}
        >
          {node.icon}
        </motion.span>
      </motion.div>
      {/* Label */}
      <p
        className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[10px] font-label font-bold whitespace-nowrap"
        style={{ color: nodeColors[node.id] + "cc" }}
      >
        {node.label}
      </p>
    </div>
  )
}

// ─── Right panel: system status HUD ─────────────────────────────────────────
const statusItems = [
  { label: "System online",      color: "#4edea3" },
  { label: "3 workflows active", color: "#00d2fd" },
  { label: "AI agents running",  color: "#2563eb" },
]

// ─── Main component ───────────────────────────────────────────────────────────
const INIT_POS = 42 // initial divider at 42% from left

export default function HeroSection() {
  const glitching = useGlitch()
  const sectionRef  = useRef(null)
  const leftRef     = useRef(null)  // clipping container
  const dividerRef  = useRef(null)  // divider bar
  const lHeadRef    = useRef(null)  // left-styled headline clone
  const rHeadRef    = useRef(null)  // right-styled headline clone
  const dragging    = useRef(false)

  // Direct DOM update — no React re-render on every mouse move
  const updatePos = (pct) => {
    pct = Math.max(6, Math.min(88, pct))
    if (leftRef.current)    leftRef.current.style.width          = `${pct}%`
    if (dividerRef.current) dividerRef.current.style.left        = `${pct}%`
    if (lHeadRef.current)   lHeadRef.current.style.clipPath      = `inset(0 ${100 - pct}% 0 0)`
    if (rHeadRef.current)   rHeadRef.current.style.clipPath      = `inset(0 0 0 ${pct}%)`
  }

  const onPointerDown = (e) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!dragging.current || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    updatePos(((e.clientX - rect.left) / rect.width) * 100)
  }
  const onPointerUp = () => { dragging.current = false }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden select-none"
      style={{ cursor: "default" }}
    >
      {/* ══════════════════════════════════════════════════════════
          RIGHT PANEL — PCE World (base layer, full width)
      ══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 bg-[#0d1117]">
        <ParticleBackground />
        {/* Kinetic gradient */}
        <motion.div
          className="absolute inset-0 kinetic-gradient pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />

        {/* Data flow nodes — hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          {flowNodes.map((node, i) => (
            <FlowNode key={node.id} node={node} delay={i * 0.25} />
          ))}
        </div>

        {/* System status HUD */}
        <motion.div
          className="absolute bottom-10 right-8 space-y-2 pointer-events-none hidden lg:block"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {statusItems.map(({ label, color }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-2 text-xs font-label"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8 }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: color }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.8 }}
              />
              <span style={{ color: color + "cc" }}>{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          LEFT PANEL — Problem World (clipped overlay)
          Hidden on mobile — desktop only
      ══════════════════════════════════════════════════════════ */}
      <div
        ref={leftRef}
        className="absolute inset-y-0 left-0 overflow-hidden hidden lg:block"
        style={{ width: `${INIT_POS}%` }}
      >
        {/* Panel bg — fixed screen-width so content doesn't stretch */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100vw", background: "#0b0604" }}
          animate={glitching ? { x: [0, -4, 3, -2, 0] } : { x: 0 }}
          transition={{ duration: 0.1, ease: "linear" }}
        >
          {/* Red vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, rgba(127,29,29,0.12) 0%, transparent 70%)",
            }}
          />

          {/* ── Document stack ── */}
          <div className="absolute left-[10%] top-[25%]">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-28 h-36 rounded border border-red-950/60 bg-[#120a07]"
                style={{ left: i * 10, top: -i * 10, zIndex: 3 - i }}
                animate={{ rotate: [(i - 1) * 3, (i - 1) * 3 + 1.5, (i - 1) * 3] }}
                transition={{ duration: 3 + i * 0.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="p-3 pt-4 space-y-1.5">
                  {[80, 100, 60, 90, 70, 55].map((w, j) => (
                    <div
                      key={j}
                      className={`h-1.5 rounded ${j === 1 ? "bg-red-900/50" : "bg-red-950/40"}`}
                      style={{ width: `${w}%` }}
                    />
                  ))}
                  {/* Error badge */}
                  {i === 0 && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold text-red-500 bg-red-950/60 px-1.5 py-0.5 rounded">
                      <span className="material-symbols-outlined text-[9px]">error</span>
                      #REF!
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Backwards clock ── */}
          <div className="absolute right-[22%] top-[30%]">
            <BackwardsClock />
          </div>

          {/* ── Loading bar (never completes) ── */}
          <div className="absolute left-[8%] bottom-[35%] space-y-1.5">
            <p className="text-[9px] font-label text-red-900/70 uppercase tracking-widest">Processing…</p>
            <div className="w-36 h-1.5 bg-red-950/40 rounded-full overflow-hidden border border-red-950/30">
              <motion.div
                className="h-full bg-gradient-to-r from-red-900/70 to-red-700/50 rounded-full"
                animate={{ width: ["0%", "86%", "86%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 0.9, 1] }}
              />
            </div>
            <p className="text-[9px] text-red-900/50 font-label">Estimated: 4 hrs</p>
          </div>

          {/* ── Spreadsheet error grid ── */}
          <div className="absolute right-[8%] bottom-[28%]">
            <div className="grid grid-cols-3 gap-px text-[8px] font-label opacity-50">
              {["A1", "ERR", "B2", "#REF!", "C3", "NULL", "D4", "ERR", "E5"].map((cell, i) => (
                <motion.div
                  key={i}
                  className={`px-1.5 py-1 border ${cell.startsWith("#") || cell === "ERR" || cell === "NULL"
                    ? "border-red-900/50 text-red-500 bg-red-950/30"
                    : "border-red-950/20 text-red-900/50"
                  }`}
                  animate={cell === "ERR" ? { opacity: [1, 0.3, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                >
                  {cell}
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── BEFORE label ── */}
          <div className="absolute top-[8%] left-[8%]">
            <motion.span
              className="text-[10px] font-bold font-label uppercase tracking-widest text-red-900/60 border border-red-950/40 px-2 py-1 rounded"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✕ Manual Operations
            </motion.span>
          </div>

          {/* Glitch slice overlay */}
          <AnimatePresence>
            {glitching && (
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  width: "100vw",
                  height: 2 + Math.random() * 4,
                  top: `${20 + Math.random() * 60}%`,
                  background: "rgba(239,68,68,0.15)",
                  mixBlendMode: "screen",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          DIVIDER — drag handle (desktop only)
      ══════════════════════════════════════════════════════════ */}
      <div
        ref={dividerRef}
        className="absolute top-0 bottom-0 z-30 hidden lg:flex items-center justify-center"
        style={{ left: `${INIT_POS}%`, transform: "translateX(-50%)", cursor: "ew-resize", width: 40 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Glowing line */}
        <motion.div
          className="absolute top-0 bottom-0 w-[1.5px]"
          style={{ left: "50%", transform: "translateX(-50%)" }}
          animate={{
            boxShadow: [
              "0 0 6px rgba(0,210,253,0.6), 0 0 20px rgba(0,210,253,0.2)",
              "0 0 16px rgba(0,210,253,1), 0 0 40px rgba(0,210,253,0.4)",
              "0 0 6px rgba(0,210,253,0.6), 0 0 20px rgba(0,210,253,0.2)",
            ],
            background: ["rgba(0,210,253,0.7)", "rgba(0,210,253,1)", "rgba(0,210,253,0.7)"],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Drag handle pill */}
        <motion.div
          className="relative z-10 w-8 h-8 rounded-full bg-[#0d1117] border border-[var(--pce-cyan)]/50 flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.2, borderColor: "rgba(0,210,253,0.9)" }}
          animate={{
            boxShadow: ["0 0 0px rgba(0,210,253,0)", "0 0 14px rgba(0,210,253,0.5)", "0 0 0px rgba(0,210,253,0)"],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="material-symbols-outlined text-[var(--pce-cyan)] text-sm">swap_horiz</span>
        </motion.div>

        {/* Drag hint */}
        <motion.p
          className="absolute bottom-12 text-[9px] font-label text-[var(--pce-cyan)]/50 whitespace-nowrap -translate-x-1/2 left-1/2"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          drag
        </motion.p>
      </div>

      {/* ══════════════════════════════════════════════════════════
          HEADLINE — dual clip-path rendering (desktop only)
          Same text rendered twice, each clipped to its world
      ══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block">
        {/* Left-world headline — muted red/glitchy */}
        <div
          ref={lHeadRef}
          className="absolute inset-0 flex items-center"
          style={{ clipPath: `inset(0 ${100 - INIT_POS}% 0 0)` }}
        >
          <div className="pl-12 pr-8 max-w-2xl" style={{ paddingTop: "4rem" }}>
            <p className="text-[10px] font-label uppercase tracking-widest text-red-900/60 mb-5">
              — Before PCE
            </p>
            <h1 className="text-6xl xl:text-7xl font-headline font-bold tracking-tighter leading-[0.92]"
              style={{ color: "#5a2020", textShadow: "1px 0 0 #ef444420, -1px 0 0 #ef444420" }}
            >
              From Manual —<br />
              <span style={{ color: "#7f2020" }}>to Intelligent.</span>
            </h1>
          </div>
        </div>

        {/* Right-world headline — clean and vivid */}
        <div
          ref={rHeadRef}
          className="absolute inset-0 flex items-center"
          style={{ clipPath: `inset(0 0 0 ${INIT_POS}%)` }}
        >
          <div className="pl-12 pr-8 max-w-2xl" style={{ paddingTop: "4rem" }}>
            <p className="text-[10px] font-label uppercase tracking-widest text-[var(--pce-cyan)]/70 mb-5">
              — With PCE Technologies
            </p>
            <h1 className="text-6xl xl:text-7xl font-headline font-bold tracking-tighter leading-[0.92] text-foreground">
              From Manual —<br />
              <span className="text-primary">to Intelligent.</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT — eyebrow, subtext, CTAs
          Sits in the right panel area on desktop, centered on mobile
      ══════════════════════════════════════════════════════════ */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="w-full px-8">

          {/* Mobile headline (shown only on mobile — replaces split version) */}
          <motion.div
            className="lg:hidden mb-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="data-pulse-dot" />
              <span className="text-[var(--pce-cyan)] font-label tracking-widest text-xs uppercase">
                Next-Gen Systems Engineering
              </span>
            </div>
            <h1 className="text-5xl font-headline font-bold tracking-tighter leading-[0.92] text-foreground mb-6">
              From Manual —<br />
              <span className="text-primary">to Intelligent.</span>
            </h1>
          </motion.div>

          {/* Desktop: subtext + CTAs pushed to right of divider */}
          <motion.div
            className="hidden lg:block"
            style={{ paddingLeft: `${INIT_POS + 4}%`, paddingTop: "18rem" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-base text-muted-foreground max-w-sm leading-relaxed mb-8">
              PCE Technologies helps businesses transition from manual operations to
              intelligent digital systems through AI, automation, and custom software.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/contact">Start a Project</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Book Consultation</Link>
              </Button>
            </div>
          </motion.div>

          {/* Mobile: subtext + CTAs */}
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
              PCE Technologies helps businesses transition from manual operations to
              intelligent digital systems through AI, automation, and custom software.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/contact">Start a Project</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Book Consultation</Link>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* PCE AFTER label — top right (desktop) */}
      <motion.div
        className="absolute top-[8%] right-8 z-20 hidden lg:block"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-[10px] font-bold font-label uppercase tracking-widest text-[var(--pce-cyan)]/60 border border-[var(--pce-cyan)]/20 px-2 py-1 rounded">
          ✓ Intelligent Systems
        </span>
      </motion.div>
    </section>
  )
}
