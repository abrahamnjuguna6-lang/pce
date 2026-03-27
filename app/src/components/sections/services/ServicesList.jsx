import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

// ─── Icon animation definitions per icon name ───────────────────────────────
const iconAnimations = {
  auto_mode: {
    animate:    { rotate: 360 },
    transition: { duration: 8, repeat: Infinity, ease: "linear" },
  },
  psychology: {
    animate:    { scale: [1, 1.18, 1] },
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  },
  analytics: {
    animate:    { y: [0, -5, 0] },
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
  terminal: {
    animate:    { opacity: [1, 0.5, 1] },
    transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
  },
  database: {
    animate:    { y: [0, -6, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  support_agent: {
    animate:    { rotate: [0, -8, 8, 0] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 },
  },
}

function AnimatedIcon({ icon, className, style }) {
  const anim = iconAnimations[icon] || {}
  return (
    <motion.span
      className={`material-symbols-outlined ${className}`}
      style={style}
      animate={anim.animate}
      transition={anim.transition}
    >
      {icon}
    </motion.span>
  )
}

// ─── Scroll reveal wrapper ───────────────────────────────────────────────────
const sectionReveal = (flip) => ({
  hidden:   { opacity: 0, x: flip ? 40 : -40 },
  visible:  { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
})

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Service data ─────────────────────────────────────────────────────────────
const services = [
  {
    id: "web",
    icon: "terminal",
    title: "Website Development",
    desc: "We deliver high-performance, SEO-optimised web experiences that convert visitors into loyal customers. Our stack focuses on speed, security, and scalability.",
    tags: ["Custom Builds", "CMS Integration", "Client Portals", "E-Commerce"],
    tagVariant: "default",
    flip: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGYD73TPAV7THCcqd4M9VU9kL-pLarPkxX6Jr4HNpLHMUl5c7YN3XjN52xt3nL5nT3JBhZnrWSrH8vsO6Sr65ShxLoo9LbFZZz-T9sqO9_WL9WUuteFR412ER3Ql0T_P29Cn1DonLrhkDb__LPLTYCFztRcEA47gRPH342bMk01koV3FCOIbMvBDmuvYDKYjuDUiaIS7QduXA9vpmwbZSol9KGVHb2YXaDqRFokMop_WlyrIzWNiuSDaDI7-rHHardghI8ccjRu-I",
  },
  {
    id: "systems",
    icon: "database",
    title: "Business Systems Development",
    desc: "Custom-engineered internal tools that streamline your operations. We translate complex business logic into intuitive, powerful software systems.",
    tags: ["Inventory Systems", "Management Dashboards", "Internal Tools", "Custom ERP"],
    tagVariant: "muted",
    flip: true,
    graphic: true,
  },
  {
    id: "automation",
    icon: "auto_mode",
    title: "Automation Systems",
    desc: "Eliminate repetitive tasks and build workflows that run 24/7 without human intervention.",
    tags: [],
    bullets: [
      { icon: "auto_graph",    title: "Automated Reports",     desc: "Real-time data compilation delivered to your inbox daily." },
      { icon: "account_tree",  title: "Workflow Automation",   desc: "Eliminate repetitive tasks with intelligent triggers and actions." },
      { icon: "sync",          title: "Data Synchronization",  desc: "Keep all your third-party platforms in perfect harmony." },
      { icon: "schedule",      title: "Scheduled Tasks",       desc: "Heavy lifting performed during off-peak hours, automatically." },
    ],
    flip: false,
  },
  {
    id: "ai",
    icon: "psychology",
    title: "AI Integration",
    badge: "Powered by Latest AI Models",
    desc: "Deploy cutting-edge AI tools that work autonomously to serve your customers and your team.",
    features: [
      { icon: "chat",       title: "AI Chatbots",          desc: "Intelligent customer support available 24/7." },
      { icon: "quickreply", title: "Automated Responses",  desc: "Instant, context-aware replies for email and messaging." },
      { icon: "smart_toy",  title: "AI Assistants",        desc: "Personalised internal tools for staff productivity." },
      { icon: "translate",  title: "NLP",                  desc: "Advanced natural language processing for data extraction." },
    ],
    flip: false,
    special: "ai",
  },
  {
    id: "analytics",
    icon: "analytics",
    title: "Data & Analytics",
    desc: "Transform raw data into actionable insights. We build custom visualisation layers that help you track KPIs and monitor business health in real-time.",
    tags: ["Real-Time Dashboards", "KPI Tracking", "Custom Reports", "Data Visualisation"],
    tagVariant: "cyan",
    flip: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKG9iFBdAr-qde-9JxtnmlYHjSpJTAdeN1b9jFDQkaVnBP03G5iV0tRhrQilrIdnyHkibLbGM46u6_M-hqzNGnuAHCKGHvVYhqzNGnuAHCKGHvVYhzGz5Rv3kt3AyyQM2GdjEVn6DaEjsdSTA06So-oWJBqxKaD-Wd_8d4I7wxf9aCnEzxM5GipOF6VLzhx1FLjCKcCSjZhFvhbP-Lvft7gefIhDlG-TX95Scp1QfOMiwR85a-lX_xQH2UhZL6qDaRL4PZzxv5V_B6SeVbVLVZzWhBHcc",
  },
  {
    id: "support",
    icon: "support_agent",
    title: "Maintenance & Support",
    desc: "We stay with you long-term. Our ongoing partnership model ensures your systems remain performant, secure, and continuously improving.",
    supportItems: [
      { icon: "system_update", title: "System Updates",           desc: "Ensuring your tech stack remains modern and secure." },
      { icon: "monitoring",    title: "Performance Monitoring",   desc: "Uptime tracking and load optimisation 24/7." },
      { icon: "trending_up",   title: "Continuous Improvements",  desc: "Iterative updates based on user feedback and data." },
      { icon: "support_agent", title: "Priority Support",         desc: "Direct access to our engineering team for critical issues." },
    ],
    flip: false,
    special: "support",
  },
]

// ─── AI section ──────────────────────────────────────────────────────────────
function AISection({ service }) {
  const { icon, title, desc, badge, features } = service
  return (
    <motion.section
      id={service.id}
      className="relative group scroll-mt-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--pce-cyan)] to-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700" />
      <div className="relative bg-pce-surface-low rounded-2xl p-12 border border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <Badge variant="emerald" className="mb-4">{badge}</Badge>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tight">{title}</h2>
          </div>
          {/* AI icon pulses */}
          <AnimatedIcon
            icon={icon}
            className="text-[var(--pce-cyan)] text-6xl mt-6 md:mt-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          />
        </div>

        {/* Feature cards — expand on hover */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map(({ icon: fi, title: ft, desc: fd }) => (
            <motion.div
              key={ft}
              variants={fadeUp}
              className="p-6 bg-pce-surface-container rounded-xl border border-pce-outline-variant/10 cursor-default"
              whileHover={{
                scale: 1.05,
                y: -6,
                borderColor: "rgba(0,210,253,0.4)",
                boxShadow: "0 0 28px rgba(0,210,253,0.12), 0 8px 24px rgba(0,0,0,0.3)",
              }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="material-symbols-outlined text-[var(--pce-cyan)] mb-4 block"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 1.5 }}
              >
                {fi}
              </motion.span>
              <h4 className="font-bold text-foreground mb-2">{ft}</h4>
              <p className="text-sm text-muted-foreground">{fd}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

// ─── Support section ─────────────────────────────────────────────────────────
function SupportSection({ service }) {
  const { icon, title, supportItems } = service
  return (
    <motion.section
      id={service.id}
      className="bg-pce-surface-lowest rounded-3xl p-12 border border-pce-outline-variant/10 scroll-mt-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-headline font-bold text-foreground tracking-tight mb-2">{title}</h2>
          <Badge variant="default" className="mt-2">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            Ongoing Partnership
          </Badge>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {supportItems.map(({ icon: si, title: st, desc: sd }) => (
          <motion.div
            key={st}
            variants={fadeUp}
            className="flex flex-col items-center text-center cursor-default"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-pce-surface-container flex items-center justify-center mb-6 border border-pce-outline-variant/20"
              whileHover={{
                borderColor: "rgba(37,99,235,0.6)",
                boxShadow: "0 0 20px rgba(37,99,235,0.2)",
              }}
              transition={{ duration: 0.25 }}
            >
              <AnimatedIcon icon={si} className="text-primary text-3xl" />
            </motion.div>
            <h4 className="font-bold mb-2 text-foreground">{st}</h4>
            <p className="text-sm text-muted-foreground">{sd}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

// ─── Standard section ─────────────────────────────────────────────────────────
function StandardSection({ service }) {
  const { icon, title, desc, tags, tagVariant, flip, img, graphic, bullets } = service

  return (
    <motion.section
      id={service.id}
      className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center scroll-mt-32"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Content column */}
      <motion.div
        className={flip ? "order-2" : "order-1 md:order-1"}
        variants={sectionReveal(flip)}
      >
        {/* Icon box */}
        <motion.div
          className="w-12 h-12 flex items-center justify-center bg-[var(--pce-cyan)]/10 rounded-lg mb-6"
          whileHover={{
            background: "rgba(0,210,253,0.2)",
            boxShadow: "0 0 16px rgba(0,210,253,0.3)",
          }}
          transition={{ duration: 0.2 }}
        >
          <AnimatedIcon icon={icon} className="text-[var(--pce-cyan)]" />
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-6 tracking-tight">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{desc}</p>

        {/* Bullets */}
        {bullets && (
          <motion.div className="space-y-6" variants={stagger}>
            {bullets.map(({ icon: bi, title: bt, desc: bd }) => (
              <motion.div
                key={bt}
                variants={fadeUp}
                className="flex items-start gap-4"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
              >
                <span className="material-symbols-outlined text-primary mt-1">{bi}</span>
                <div>
                  <h4 className="font-bold text-foreground">{bt}</h4>
                  <p className="text-muted-foreground text-sm">{bd}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <motion.div className="flex flex-wrap gap-3" variants={stagger}>
            {tags.map((tag) => (
              <motion.div key={tag} variants={fadeUp}>
                <Badge variant={tagVariant}>{tag}</Badge>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Visual column */}
      <motion.div
        className={`${flip ? "order-1" : "order-2"} bg-pce-surface-low rounded-xl p-4 border border-pce-outline-variant/10`}
        variants={sectionReveal(!flip)}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 40px rgba(37,99,235,0.12), 0 8px 32px rgba(0,0,0,0.3)",
          borderColor: "rgba(37,99,235,0.3)",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {img ? (
          <img src={img} alt={title} className="w-full rounded-lg opacity-80" />
        ) : graphic ? (
          <div className="relative overflow-hidden p-8">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-9xl text-foreground">{icon}</span>
            </div>
            <div className="space-y-4">
              <motion.div
                className="h-2 w-32 bg-primary rounded"
                animate={{ scaleX: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="h-2 w-48 bg-pce-surface-highest rounded" />
              <div className="h-40 w-full bg-pce-surface-lowest rounded-lg border border-pce-outline-variant/20 flex items-center justify-center">
                <AnimatedIcon icon={icon} className="text-4xl text-[var(--pce-cyan)]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center">
            <AnimatedIcon icon={icon} className="text-8xl text-primary/20" />
          </div>
        )}
      </motion.div>
    </motion.section>
  )
}

// ─── Router ──────────────────────────────────────────────────────────────────
function ServiceSection({ service }) {
  if (service.special === "ai")      return <AISection service={service} />
  if (service.special === "support") return <SupportSection service={service} />
  return <StandardSection service={service} />
}

// ─── List ────────────────────────────────────────────────────────────────────
export default function ServicesList() {
  return (
    <main className="max-w-7xl mx-auto px-8 py-24 space-y-40">
      {services.map((service) => (
        <ServiceSection key={service.id} service={service} />
      ))}

      {/* Bottom CTA */}
      <motion.section
        className="relative"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-pce-surface-container border border-primary/30 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">
              Not sure which service fits your needs?
            </h3>
            <p className="text-muted-foreground">
              Our consultants are ready to audit your current infrastructure and provide a custom roadmap.
            </p>
          </div>
          <motion.a
            href="/contact"
            className="btn-primary shrink-0 inline-flex items-center gap-2 group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Book a Free Consultation
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </motion.a>
        </div>
      </motion.section>
    </main>
  )
}
