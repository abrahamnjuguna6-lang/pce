import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import CTABanner from "@/components/common/CTABanner"

// ─── Data ─────────────────────────────────────────────────────────────────────
const challenges = [
  { icon: "sync_problem",  title: "Inefficient Workflows",  desc: "Repetitive tasks drain time and resources across your team every day." },
  { icon: "person_off",    title: "Manual Processes",        desc: "Error-prone, human-dependent operations slow growth and introduce risk." },
  { icon: "link_off",      title: "Disconnected Systems",    desc: "Siloed tools create data gaps and communication failures." },
  { icon: "bar_chart_off", title: "Lack of Analytics",       desc: "Decisions made without data lead to missed opportunities and wasted spend." },
]

const comparisons = [
  { problem: "Hours spent on manual reporting",     solution: "Automated reports delivered on schedule",   icon: "auto_graph" },
  { problem: "Stock errors from manual tracking",   solution: "Live inventory with smart alerts",           icon: "inventory_2" },
  { problem: "Overwhelmed support teams",           solution: "AI agents handling 80% of queries",          icon: "smart_toy" },
  { problem: "Data scattered across spreadsheets",  solution: "Centralised real-time dashboards",           icon: "dashboard" },
]

const implementations = [
  { icon: "bar_chart",     title: "Automated Reporting Systems",  desc: "Real-time data compiled and delivered to decision-makers on schedule." },
  { icon: "inventory_2",   title: "Inventory Management Systems", desc: "Live stock tracking, low-stock alerts, and supplier integrations." },
  { icon: "support_agent", title: "AI Customer Service Agents",   desc: "24/7 intelligent support without increasing headcount." },
  { icon: "dashboard",     title: "Internal Dashboards",          desc: "Centralised control panels for operations, finance, and HR teams." },
]

const industries = ["Retail", "Logistics", "Education", "Professional Services", "SMEs"]

// ─── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Before/After Drag Slider ─────────────────────────────────────────────────
function BeforeAfterSlider() {
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const updatePosition = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl cursor-ew-resize select-none h-72 md:h-96 border border-pce-outline-variant/20"
      onPointerDown={(e) => {
        dragging.current = true
        updatePosition(e.clientX)
        e.currentTarget.setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => dragging.current && updatePosition(e.clientX)}
      onPointerUp={() => { dragging.current = false }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── AFTER panel (right / automated — always full width, behind) ── */}
      <div className="absolute inset-0 bg-pce-surface-container flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-[var(--pce-cyan)]/5" />
        <div className="relative z-10 w-full max-w-md px-8 space-y-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--pce-cyan)]">Automated System</p>
          {/* Simulated workflow nodes */}
          <div className="flex items-center gap-3">
            {["input_circle", "sync", "auto_graph", "send"].map((ic, i) => (
              <div key={ic} className="flex items-center gap-2">
                <motion.div
                  className="w-10 h-10 rounded-full bg-pce-surface-low border border-[var(--pce-cyan)]/40 flex items-center justify-center"
                  animate={{ boxShadow: ["0 0 0px rgba(0,210,253,0)", "0 0 12px rgba(0,210,253,0.5)", "0 0 0px rgba(0,210,253,0)"] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.45 }}
                >
                  <span className="material-symbols-outlined text-[var(--pce-cyan)] text-base">{ic}</span>
                </motion.div>
                {i < 3 && (
                  <motion.div
                    className="h-0.5 w-6 bg-gradient-to-r from-[var(--pce-cyan)] to-primary"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.45 + 0.2 }}
                    style={{ originX: 0 }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {["Report generated", "Alert dispatched", "Dashboard updated"].map((label, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-2 text-sm text-foreground/80"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8 }}
              >
                <span className="material-symbols-outlined text-[var(--pce-emerald)] text-sm">check_circle</span>
                {label}
              </motion.div>
            ))}
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--pce-emerald)]">
            <span className="material-symbols-outlined text-sm">bolt</span>
            0 hrs manual effort
          </div>
        </div>
      </div>

      {/* ── BEFORE panel (left / manual — clipped by position%) ── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${position}%` }}
      >
        <div className="absolute inset-0 bg-pce-surface-lowest" style={{ width: "100vw" }}>
          <div className="absolute inset-0 bg-destructive/5" />
          <div className="relative z-10 w-full max-w-md px-8 pt-12 space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-destructive">Manual Process</p>
            {/* Simulated paper stack */}
            <div className="space-y-2">
              {["description", "description", "description"].map((ic, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 bg-destructive/10 border border-destructive/20 rounded"
                  style={{ marginLeft: i * 6, opacity: 1 - i * 0.2 }}
                >
                  <span className="material-symbols-outlined text-destructive text-sm">{ic}</span>
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 w-24 bg-destructive/20 rounded" />
                    <div className="h-1.5 w-16 bg-destructive/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {["Copy spreadsheet", "Send email chain", "Wait for approval"].map((label) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="material-symbols-outlined text-destructive text-sm">close</span>
                  {label}
                </div>
              ))}
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-destructive">
              <span className="material-symbols-outlined text-sm">schedule</span>
              4+ hrs manual effort
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-0.5 h-full bg-white/30" />
        <div className="absolute w-9 h-9 bg-white rounded-full shadow-xl flex items-center justify-center pointer-events-none">
          <span className="material-symbols-outlined text-gray-700 text-sm">swap_horiz</span>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="text-xs font-bold font-label uppercase tracking-widest text-destructive bg-pce-surface-lowest/80 px-2 py-1 rounded">
          Before
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="text-xs font-bold font-label uppercase tracking-widest text-[var(--pce-cyan)] bg-pce-surface-container/80 px-2 py-1 rounded">
          After
        </span>
      </div>

      {/* Drag hint — fades once user drags */}
      <AnimatePresence>
        {position === 50 && (
          <motion.div
            className="absolute inset-0 flex items-end justify-center pb-6 z-30 pointer-events-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              className="text-xs font-bold font-label text-white/50 flex items-center gap-1"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="material-symbols-outlined text-sm">drag_indicator</span>
              Drag to compare
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Comparison Row (problem → solution with animated arrow) ──────────────────
function ComparisonRow({ problem, solution, icon, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.4"] })
  const arrowWidth = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "100%"])
  const solutionOpacity = useTransform(scrollYProgress, [0.5, 0.9], [0, 1])
  const solutionX = useTransform(scrollYProgress, [0.5, 0.9], [20, 0])
  const problemOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0.4])

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Problem */}
      <motion.div
        style={{ opacity: problemOpacity }}
        className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl"
      >
        <span className="material-symbols-outlined text-destructive text-base shrink-0">close</span>
        <span className="text-foreground text-sm leading-snug">{problem}</span>
      </motion.div>

      {/* Animated arrow bridge */}
      <div className="relative flex items-center justify-center w-16 md:w-24 shrink-0">
        <div className="w-full h-0.5 bg-pce-outline-variant/20 rounded overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-destructive via-primary to-[var(--pce-emerald)]"
            style={{ width: arrowWidth }}
          />
        </div>
        <motion.span
          className="material-symbols-outlined text-primary absolute right-0"
          style={{ opacity: solutionOpacity }}
        >
          arrow_forward
        </motion.span>
      </div>

      {/* Solution */}
      <motion.div
        style={{ opacity: solutionOpacity, x: solutionX }}
        className="flex items-center gap-3 p-4 bg-[var(--pce-emerald)]/10 border border-[var(--pce-emerald)]/30 rounded-xl"
      >
        <span className="material-symbols-outlined text-[var(--pce-emerald)] text-base shrink-0">check</span>
        <span className="text-foreground text-sm leading-snug">{solution}</span>
      </motion.div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Solutions() {
  return (
    <>
      {/* Hero */}
      <header className="min-h-[60vh] flex items-end pb-20 pt-36 px-8 bg-pce-surface-lowest relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute inset-0 kinetic-gradient" />
        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.nav
            variants={fadeUp}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-foreground">Solutions</span>
          </motion.nav>
          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-foreground mb-6"
          >
            From Manual<br />to Intelligent.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-xl text-muted-foreground leading-relaxed"
          >
            We help businesses replace slow manual processes with intelligent digital systems
            that work for them 24/7.
          </motion.p>
        </motion.div>
      </header>

      {/* Challenges */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            className="text-4xl font-headline font-bold tracking-tight text-foreground mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Challenges Businesses Face
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {challenges.map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="p-6 bg-pce-surface-low border border-destructive/20 rounded-xl"
                whileHover={{
                  y: -6,
                  borderColor: "rgba(255,180,171,0.5)",
                  boxShadow: "0 0 24px rgba(255,180,171,0.1), 0 8px 24px rgba(0,0,0,0.3)",
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="material-symbols-outlined text-destructive text-3xl block mb-4"
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                >
                  {icon}
                </motion.span>
                <h3 className="font-headline font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem → Solution Transition */}
      <section className="py-24 bg-pce-surface-lowest">
        <div className="max-w-5xl mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--pce-cyan)] mb-3 block">
              The Transformation
            </span>
            <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground">
              How PCE Solves It
            </h2>
          </motion.div>

          {/* Column headers */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-destructive">The Problem</p>
            <div className="w-16 md:w-24" />
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--pce-emerald)]">The Solution</p>
          </div>

          {/* Animated comparison rows */}
          <div className="space-y-4">
            {comparisons.map((c, i) => (
              <ComparisonRow key={c.problem} {...c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Before / After Drag Slider */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--pce-cyan)] mb-3 block">
              See the Difference
            </span>
            <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-4">
              Before &amp; After
            </h2>
            <p className="text-muted-foreground">
              Drag the divider to compare a traditional reporting process with an automated system.
            </p>
          </motion.div>

          <BeforeAfterSlider />
        </div>
      </section>

      {/* Example Implementations */}
      <section className="py-24 bg-pce-surface-lowest">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            className="text-4xl font-headline font-bold tracking-tight text-foreground mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What This Looks Like in Practice
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {implementations.map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="p-6 bg-pce-surface-low rounded-xl border border-pce-outline-variant/10"
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  borderColor: "rgba(0,210,253,0.3)",
                  boxShadow: "0 0 24px rgba(0,210,253,0.1), 0 8px 24px rgba(0,0,0,0.3)",
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="material-symbols-outlined text-[var(--pce-cyan)] text-3xl block mb-4"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {icon}
                </motion.span>
                <h3 className="font-headline font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                <Link
                  to="/contact"
                  className="text-primary text-sm font-bold inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Learn More
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.h2
            className="text-4xl font-headline font-bold tracking-tight text-foreground mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Who We Work With
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {industries.map((industry) => (
              <motion.div
                key={industry}
                variants={fadeUp}
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="muted" className="px-6 py-3 text-base">{industry}</Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner
        headline="Start your transformation today."
        subtext="Book a free consultation and let's map out your path to intelligent systems."
        primaryLabel="Start a Project"
        secondaryLabel="View Our Services"
        secondaryTo="/services"
      />
    </>
  )
}
