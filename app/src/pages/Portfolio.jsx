import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import CTABanner from "@/components/common/CTABanner"

// ─── Data ─────────────────────────────────────────────────────────────────────
const filters = ["All", "Automation", "AI", "Web", "Systems"]

const projects = [
  {
    id: "inventory",
    title: "Retail Inventory Dashboard",
    category: "Systems",
    icon: "dashboard",
    color: "#2563eb",
    tags: ["React", "Node.js", "PostgreSQL"],
    problem: "Manual stock tracking causing oversells and lost revenue.",
    desc: "Built a real-time inventory system with automated low-stock alerts, supplier integration, and purchase order automation.",
    outcome: "40% fewer stock errors",
    result: "Live inventory tracking, automated purchase orders, and supplier integrations — saving the operations team 15 hrs/week and eliminating oversells entirely.",
    metrics: [
      { label: "Stock errors reduced", value: "40%" },
      { label: "Hours saved/week",     value: "15h" },
      { label: "Supplier integrations", value: "100%" },
    ],
    mockUI: ["bar_chart", "inventory_2", "notifications", "sync"],
  },
  {
    id: "ai-support",
    title: "AI Customer Support Agent",
    category: "AI",
    icon: "psychology",
    color: "#00d2fd",
    tags: ["Python", "OpenAI", "FastAPI"],
    problem: "High support volume overwhelming the team.",
    desc: "Deployed an AI agent handling 80% of customer queries automatically with intelligent human escalation for complex issues.",
    outcome: "80% queries resolved automatically",
    result: "An intelligent multi-channel support agent trained on the client's knowledge base — resolving most queries instantly while routing edge cases to human agents.",
    metrics: [
      { label: "Queries automated",  value: "80%" },
      { label: "Cost reduced",       value: "60%" },
      { label: "Response time",      value: "<2s" },
    ],
    mockUI: ["chat", "smart_toy", "quickreply", "person"],
  },
  {
    id: "logistics",
    title: "Logistics Workflow Automation",
    category: "Automation",
    icon: "auto_mode",
    color: "#4edea3",
    tags: ["n8n", "Zapier", "REST APIs"],
    problem: "Manual data entry across 5 disconnected systems.",
    desc: "Automated end-to-end shipment tracking and reporting, saving 20+ hours per week across the operations team.",
    outcome: "20+ hrs/week saved",
    result: "Full automation pipeline syncing shipment data across 5 platforms in real-time — zero manual entry, instant alerts, and daily automated reports.",
    metrics: [
      { label: "Hours saved/week",    value: "20h" },
      { label: "Systems integrated",  value: "5" },
      { label: "Manual entry",        value: "0%" },
    ],
    mockUI: ["local_shipping", "sync_alt", "account_tree", "schedule"],
  },
  {
    id: "hr-portal",
    title: "Internal HR Management Portal",
    category: "Systems",
    icon: "group",
    color: "#2563eb",
    tags: ["Next.js", "Supabase"],
    problem: "Spreadsheet chaos for HR and onboarding.",
    desc: "Replaced Excel-based HR tracking with a custom portal featuring automated onboarding flows and document management.",
    outcome: "Onboarding time halved",
    result: "A centralised HR portal with role-based access, automated onboarding workflows, digital document signing, and leave tracking — replacing a dozen spreadsheets.",
    metrics: [
      { label: "Onboarding time",     value: "−50%" },
      { label: "Spreadsheets removed", value: "12" },
      { label: "Staff adopted",        value: "100%" },
    ],
    mockUI: ["badge", "folder_shared", "edit_document", "check_circle"],
  },
  {
    id: "sales-analytics",
    title: "Sales Analytics Dashboard",
    category: "Systems",
    icon: "analytics",
    color: "#2563eb",
    tags: ["Python", "Plotly", "Streamlit"],
    problem: "No visibility into pipeline or conversion data.",
    desc: "Created live KPI dashboards pulling from CRM and financial data sources with daily automated reporting.",
    outcome: "Real-time pipeline visibility",
    result: "A unified analytics layer connecting CRM, finance, and marketing data — delivering automated daily reports to the leadership team and live KPI monitoring.",
    metrics: [
      { label: "Data sources unified", value: "4" },
      { label: "Report time",          value: "0 min" },
      { label: "Decision speed",       value: "3×" },
    ],
    mockUI: ["bar_chart", "trending_up", "pie_chart", "auto_graph"],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    category: "Web",
    icon: "storefront",
    color: "#4edea3",
    tags: ["Next.js", "Stripe", "Tailwind"],
    problem: "Outdated storefront with poor conversion rates.",
    desc: "Rebuilt the storefront with modern UX patterns, optimised checkout, and a 40% conversion rate improvement.",
    outcome: "+40% conversion rate",
    result: "A complete ground-up rebuild with performance-first architecture, one-click checkout, abandoned cart recovery, and mobile-optimised product pages.",
    metrics: [
      { label: "Conversion increase",  value: "+40%" },
      { label: "Load time",            value: "<1s" },
      { label: "Mobile revenue",       value: "+65%" },
    ],
    mockUI: ["storefront", "shopping_cart", "payments", "star"],
  },
]

const techGroups = [
  { label: "Frontend",   items: ["React", "Next.js", "Vue"] },
  { label: "Backend",    items: ["Node.js", "Python", "FastAPI"] },
  { label: "Data",       items: ["PostgreSQL", "Supabase", "MongoDB"] },
  { label: "Automation", items: ["n8n", "Zapier"] },
  { label: "AI",         items: ["OpenAI", "LangChain"] },
  { label: "Cloud",      items: ["AWS", "GCP", "Vercel"] },
]

// ─── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
}

// ─── Project Modal ─────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal panel */}
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-pce-surface-container rounded-2xl border border-pce-outline-variant/20 shadow-2xl"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Simulated screenshot area */}
        <div
          className="relative h-52 overflow-hidden rounded-t-2xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${project.color}18, var(--pce-surface-lowest))` }}
        >
          {/* Decorative border-glow top edge */}
          <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: project.color }} />

          {/* Mock UI elements */}
          <div className="absolute inset-0 p-6 flex flex-col gap-3 opacity-40">
            <div className="flex gap-2">
              <div className="h-2 w-16 rounded" style={{ background: project.color }} />
              <div className="h-2 w-24 bg-pce-surface-high rounded" />
            </div>
            <div className="flex gap-3 flex-1">
              <div className="flex-1 bg-pce-surface-low rounded-lg border border-pce-outline-variant/20" />
              <div className="flex-1 bg-pce-surface-low rounded-lg border border-pce-outline-variant/20" />
              <div className="flex-1 bg-pce-surface-low rounded-lg border border-pce-outline-variant/20" />
            </div>
            <div className="h-12 bg-pce-surface-low rounded-lg border border-pce-outline-variant/20" />
          </div>

          {/* Central icon cluster */}
          <div className="relative z-10 flex items-center gap-4">
            {project.mockUI.map((ic, i) => (
              <motion.div
                key={ic}
                className="w-12 h-12 rounded-xl flex items-center justify-center border"
                style={{ background: project.color + "18", borderColor: project.color + "40" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="material-symbols-outlined text-xl"
                  style={{ color: project.color }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                >
                  {ic}
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Close button */}
          <motion.button
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pce-surface-container/80 flex items-center justify-center border border-pce-outline-variant/30 text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="material-symbols-outlined text-base">close</span>
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="text-2xl font-headline font-bold text-foreground">{project.title}</h2>
              <Badge variant="muted" className="shrink-0 capitalize">{project.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.result}</p>
          </motion.div>

          {/* Metrics */}
          <motion.div
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.4 }}
          >
            {project.metrics.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl p-4 text-center border"
                style={{ background: project.color + "0d", borderColor: project.color + "30" }}
              >
                <p className="text-2xl font-headline font-bold" style={{ color: project.color }}>{value}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Problem */}
          <motion.div
            className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.4 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-destructive mb-1">The Problem</p>
            <p className="text-sm text-muted-foreground">{project.problem}</p>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Technologies Used
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border font-label font-bold"
                  style={{ borderColor: project.color + "40", color: project.color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.36, duration: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
              style={{ color: project.color }}
            >
              Discuss a Similar Project
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Project Card (3D tilt + hover reveal) ────────────────────────────────────
function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  // Raw motion values for mouse position (normalised -0.5 to 0.5)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Spring-smoothed tilt
  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 }
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), springConfig)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]),  springConfig)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5)
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      className="relative overflow-hidden rounded-2xl border border-pce-outline-variant/20 bg-pce-surface-low cursor-pointer h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{
        borderColor: project.color + "60",
        boxShadow: `0 0 36px ${project.color}20, 0 12px 40px rgba(0,0,0,0.4)`,
        y: -6,
      }}
      transition={{ y: { duration: 0.25 }, boxShadow: { duration: 0.25 }, borderColor: { duration: 0.25 } }}
    >
      {/* Card content */}
      <div className="p-6 space-y-4">
        {/* Icon + category */}
        <div className="flex items-center justify-between">
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: project.color + "18" }}
            animate={hovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ color: project.color }}
            >
              {project.icon}
            </span>
          </motion.div>
          <Badge variant="muted" className="text-xs capitalize">{project.category}</Badge>
        </div>

        <h3 className="font-headline font-bold text-lg text-foreground leading-snug">{project.title}</h3>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full border font-label"
              style={{ borderColor: project.color + "35", color: project.color + "cc" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.desc}</p>
      </div>

      {/* Hover-reveal outcome strip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute bottom-0 inset-x-0 px-6 py-4 flex items-center justify-between"
            style={{ background: `linear-gradient(to top, ${project.color}20, transparent)` }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: project.color }}>
                Outcome
              </p>
              <p className="text-sm font-bold text-foreground">{project.outcome}</p>
            </div>
            <motion.div
              className="flex items-center gap-1 text-xs font-bold"
              style={{ color: project.color }}
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            >
              View
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom glow edge */}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-0.5"
        style={{ background: project.color }}
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <>
      {/* Hero */}
      <header className="pt-36 pb-20 px-8 bg-pce-surface-lowest relative overflow-hidden">
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
            <span className="text-foreground">Portfolio</span>
          </motion.nav>
          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-foreground mb-6"
          >
            Our Work
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-xl text-muted-foreground leading-relaxed mb-10"
          >
            A showcase of systems, platforms, and intelligent tools we've delivered for businesses.
          </motion.p>

          {/* Filter pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="relative px-5 py-2 rounded-full text-sm font-bold font-label overflow-hidden"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <AnimatePresence>
                  {activeFilter === f && (
                    <motion.span
                      layoutId="filterPill"
                      className="absolute inset-0 bg-primary rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
                <span className={`relative z-10 transition-colors ${activeFilter === f ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {f}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </header>

      {/* Projects Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Before vs After */}
      <section className="py-24 bg-pce-surface-lowest">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            className="text-4xl font-headline font-bold tracking-tight text-foreground mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Before vs. After
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            <motion.div
              className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-headline font-bold text-destructive mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">cancel</span> Before
              </h3>
              <ul className="space-y-3">
                {["Slow response times (8+ hour SLA)", "Overwhelmed support staff", "Inconsistent answers across agents", "High operational cost per ticket"].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  >
                    <span className="material-symbols-outlined text-destructive text-sm mt-0.5">close</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <motion.span
                className="material-symbols-outlined text-primary text-6xl rotate-90 lg:rotate-0"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                arrow_forward
              </motion.span>
            </motion.div>

            <motion.div
              className="bg-[var(--pce-emerald)]/5 border border-[var(--pce-emerald)]/20 rounded-2xl p-8"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-headline font-bold text-[var(--pce-emerald)] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span> After
              </h3>
              <ul className="space-y-3">
                {["24/7 instant responses under 2 seconds", "80% of queries handled automatically", "Consistent, accurate answers every time", "Cost reduced by 60%"].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  >
                    <span className="material-symbols-outlined text-[var(--pce-emerald)] text-sm mt-0.5">check</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            className="text-3xl font-headline font-bold tracking-tight text-foreground mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Technologies Behind Our Work
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {techGroups.map(({ label, items }, gi) => (
              <motion.div
                key={label}
                className="space-y-3"
                variants={{
                  hidden:  { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: gi * 0.07 } },
                }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
                {items.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05, x: 2 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Badge variant="muted" className="block text-center">{item}</Badge>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner
        headline="Have a project in mind?"
        subtext="We'd love to hear about your challenges and what you're looking to build."
        primaryLabel="Let's Build It Together"
        secondaryLabel="View Services"
        secondaryTo="/services"
      />

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
