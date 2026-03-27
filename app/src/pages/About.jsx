import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import CTABanner from "@/components/common/CTABanner"

// ─── Data ─────────────────────────────────────────────────────────────────────
const milestones = [
  {
    year: "2021",
    title: "Founded",
    desc: "PCE Technologies established with a vision to bridge the gap between complex technology and everyday business operations.",
    icon: "flag",
    color: "#2563eb",
  },
  {
    year: "2022",
    title: "First AI Integration Delivered",
    desc: "Deployed our first AI-powered customer support agent for a retail client, resolving 70% of queries automatically from day one.",
    icon: "psychology",
    color: "#00d2fd",
  },
  {
    year: "2023",
    title: "Automation Platform Launched",
    desc: "Built a repeatable automation framework across logistics, retail, and professional services — saving hundreds of hours per month.",
    icon: "auto_mode",
    color: "#4edea3",
  },
  {
    year: "2024",
    title: "20+ Clients Across 5 Industries",
    desc: "Expanded our portfolio and team to serve growing businesses nationwide, delivering custom ERP systems, dashboards, and intelligent workflows.",
    icon: "groups",
    color: "#2563eb",
  },
  {
    year: "2025",
    title: "Enterprise AI & National Scale",
    desc: "Launching enterprise-grade AI agents and infrastructure solutions, positioning PCE as the go-to intelligent systems partner for ambitious businesses.",
    icon: "rocket_launch",
    color: "#00d2fd",
  },
]

const team = [
  {
    name: "Charles Maina Murage",
    role: "Business Development Manager",
    initials: "CM",
    gradient: "from-primary to-[var(--pce-cyan)]",
    bio: "Driving PCE's growth strategy and client relationships — connecting ambitious businesses with the technology solutions they need to scale.",
    skills: ["Business Strategy", "Client Relations", "Market Expansion"],
    social: {
      linkedin:  "#",
      twitter:   "#",
      facebook:  "#",
      instagram: "#",
    },
  },
  {
    name: "Emmanuel Njuguna",
    role: "Lead Engineer",
    initials: "EN",
    gradient: "from-[var(--pce-cyan)] to-primary",
    bio: "Full-stack architect and AI systems engineer — building scalable, intelligent platforms that power PCE's client solutions end to end.",
    skills: ["React", "Node.js", "AI Systems"],
    social: {
      linkedin:  "#",
      twitter:   "#",
      facebook:  "#",
      instagram: "#",
    },
  },
]

const philosophy = [
  { icon: "lightbulb",  title: "Innovation First",      desc: "We embrace emerging technologies and apply them where they create real value, not just where they're trendy." },
  { icon: "auto_mode",  title: "Automation by Default", desc: "If it's repetitive, we automate it. We build systems that work for your business around the clock." },
  { icon: "psychology", title: "Intelligence at Scale",  desc: "From AI chatbots to analytics dashboards, we embed intelligence into every layer of what we build." },
]

const techApproach = [
  "Scalable Architecture",
  "Modern Tech Stack",
  "Clean Maintainable Code",
  "Long-Term Thinking",
  "Security First",
  "API-First Design",
]

// ─── Social icons (SVG brand marks) ───────────────────────────────────────────
const SOCIAL_ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
}

const SOCIAL_META = {
  linkedin:  { label: "LinkedIn",  color: "#0A66C2" },
  twitter:   { label: "Twitter/X", color: "#e2e2e9" },
  facebook:  { label: "Facebook",  color: "#1877F2" },
  instagram: { label: "Instagram", color: "#E4405F" },
}

// ─── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Timeline Item ─────────────────────────────────────────────────────────────
function TimelineItem({ milestone, index, isLast }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })
  const { year, title, desc, icon, color } = milestone

  return (
    <div ref={ref} className="flex gap-6 md:gap-10">
      {/* Left: dot + connecting line */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        {/* Dot */}
        <div className="relative">
          {/* Pulse ring — only when in view */}
          {isInView && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ borderColor: color, border: `2px solid ${color}` }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <motion.div
            className="relative w-5 h-5 rounded-full border-2 flex items-center justify-center"
            animate={isInView
              ? { borderColor: color, backgroundColor: color, scale: [1, 1.2, 1] }
              : { borderColor: "#434655", backgroundColor: "transparent", scale: 1 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {isInView && (
              <motion.span
                className="material-symbols-outlined text-white"
                style={{ fontSize: 10 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {icon}
              </motion.span>
            )}
          </motion.div>
        </div>

        {/* Connector line to next dot */}
        {!isLast && (
          <motion.div
            className="w-0.5 flex-1 mt-3 rounded"
            style={{ background: `linear-gradient(to bottom, ${color}60, #43465540)` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>

      {/* Right: content */}
      <motion.div
        className="pb-14"
        initial={{ opacity: 0, x: -24 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="text-xs font-bold font-label uppercase tracking-widest block mb-2"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {year}
        </motion.span>
        <h3 className="text-xl font-headline font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm max-w-lg">{desc}</p>
      </motion.div>
    </div>
  )
}

// ─── Flip Team Card ────────────────────────────────────────────────────────────
function TeamCard({ member, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      className="relative h-80 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
      whileHover={!flipped ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Front */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-pce-surface-low border border-pce-outline-variant/20 p-6 flex flex-col items-center justify-center gap-4 text-center"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
      >
        {/* Avatar */}
        <motion.div
          className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center shrink-0`}
          animate={!flipped ? {
            boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 20px rgba(37,99,235,0.3)", "0 0 0px rgba(37,99,235,0)"],
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        >
          <span className="font-headline font-bold text-white text-lg">{member.initials}</span>
        </motion.div>

        <div>
          <h3 className="font-headline font-bold text-foreground">{member.name}</h3>
          <p className="text-sm text-[var(--pce-cyan)]">{member.role}</p>
        </div>

        {/* Social links */}
        <div
          className="flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {Object.entries(member.social).map(([platform, href]) => (
            <motion.a
              key={platform}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_META[platform].label}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground border border-pce-outline-variant/30 bg-pce-surface-container transition-colors"
              whileHover={{
                color: SOCIAL_META[platform].color,
                borderColor: SOCIAL_META[platform].color,
                backgroundColor: `${SOCIAL_META[platform].color}15`,
                y: -2,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.18 }}
            >
              <span className="w-3.5 h-3.5">
                {SOCIAL_ICONS[platform]}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Flip hint */}
        <motion.p
          className="text-xs text-muted-foreground flex items-center gap-1"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="material-symbols-outlined text-xs">flip</span>
          Click card to see more
        </motion.p>
      </motion.div>

      {/* Back */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-pce-surface-container border border-pce-outline-variant/30 p-6 flex flex-col justify-between"
        initial={{ rotateY: -180 }}
        animate={{ rotateY: flipped ? 0 : -180 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
      >
        <div className="space-y-3">
          <div>
            <h3 className="font-headline font-bold text-foreground text-sm">{member.name}</h3>
            <p className="text-xs text-[var(--pce-cyan)]">{member.role}</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Expertise</p>
          <div className="flex flex-wrap gap-1.5">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-0.5 rounded-full border border-primary/30 text-primary font-label"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Back-flip hint */}
        <motion.p
          className="text-xs text-muted-foreground flex items-center gap-1"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="material-symbols-outlined text-xs">flip</span>
          Click to flip back
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <>
      {/* Hero */}
      <header className="pt-36 pb-20 px-8 bg-pce-surface-lowest relative overflow-hidden">
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
            <span className="text-foreground">About</span>
          </motion.nav>
          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-foreground mb-6"
          >
            About PCE<br />Technologies
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-xl text-muted-foreground leading-relaxed"
          >
            Building the intelligent infrastructure of tomorrow's businesses.
          </motion.p>
        </motion.div>
      </header>

      {/* Company Overview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-6">Who We Are</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              PCE Technologies is a technology consultancy that helps businesses transition from manual,
              disconnected operations to intelligent, automated digital systems. We design, build, and
              support custom software solutions tailored to each client's unique challenges.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From small and medium enterprises to growing logistics and retail businesses, we deliver
              solutions that create real, measurable impact.
            </p>
          </motion.div>

          <motion.div
            className="bg-pce-surface-low rounded-2xl p-10 border border-pce-outline-variant/20 flex items-center justify-center min-h-64"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ boxShadow: "0 0 40px rgba(37,99,235,0.1)", borderColor: "rgba(37,99,235,0.3)" }}
          >
            <motion.div
              className="grid grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {["code", "psychology", "auto_mode", "hub", "analytics", "cloud_done"].map((icon, i) => (
                <motion.span
                  key={icon}
                  variants={fadeUp}
                  className="material-symbols-outlined text-[var(--pce-cyan)] text-4xl flex items-center justify-center"
                  animate={{ y: [0, -5, 0], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                >
                  {icon}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Story Timeline */}
      <section className="py-24 bg-pce-surface-lowest">
        <div className="max-w-3xl mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--pce-cyan)] mb-3 block">
              Our Journey
            </span>
            <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground">
              The PCE Story
            </h2>
          </motion.div>

          <div>
            {milestones.map((milestone, i) => (
              <TimelineItem
                key={milestone.year}
                milestone={milestone}
                index={i}
                isLast={i === milestones.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                icon: "visibility",
                title: "Our Vision",
                text: "A world where every business, regardless of size, has access to intelligent systems that let them compete, grow, and operate without limits.",
                accent: "text-primary",
                border: "border-primary/20",
                bg: "bg-primary/5",
              },
              {
                icon: "flag",
                title: "Our Mission",
                text: "To deliver modern, scalable technology solutions that eliminate inefficiency, automate the repetitive, and empower businesses through data and AI.",
                accent: "text-[var(--pce-cyan)]",
                border: "border-[var(--pce-cyan)]/20",
                bg: "bg-[var(--pce-cyan)]/5",
              },
            ].map(({ icon, title, text, accent, border, bg }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className={`p-8 rounded-2xl border ${border} ${bg}`}
                whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
                transition={{ duration: 0.25 }}
              >
                <motion.span
                  className={`material-symbols-outlined text-3xl ${accent} block mb-4`}
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {icon}
                </motion.span>
                <h3 className="text-2xl font-headline font-bold text-foreground mb-4">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-pce-surface-lowest">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.h2
            className="text-4xl font-headline font-bold tracking-tight text-foreground mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What We Believe In
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {philosophy.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="space-y-4"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="material-symbols-outlined text-[var(--pce-cyan)] text-5xl block"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 1 }}
                >
                  {icon}
                </motion.span>
                <h3 className="text-xl font-headline font-bold text-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-3">
              The People Behind PCE
            </h2>
            <p className="text-muted-foreground text-sm">Click any card to learn more</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Approach */}
      <section className="py-24 bg-pce-surface-lowest">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-8">How We Build</h2>
            <motion.ul
              className="space-y-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {techApproach.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-center gap-4"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    className="material-symbols-outlined text-[var(--pce-emerald)]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    check_circle
                  </motion.span>
                  <span className="font-medium text-foreground">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="bg-pce-surface-low rounded-2xl p-10 border border-pce-outline-variant/20"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="space-y-3"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { label: "Frontend Layer",      color: "var(--pce-cyan)" },
                { label: "API / Backend",        color: "var(--pce-blue)" },
                { label: "Data Layer",           color: "var(--pce-blue)" },
                { label: "AI Services",          color: "var(--pce-blue)" },
                { label: "Cloud Infrastructure", color: "var(--pce-emerald)" },
              ].map(({ label, color }, i) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex items-center gap-4 p-3 bg-pce-surface-container rounded-lg border border-pce-outline-variant/20"
                  whileHover={{ x: 4, borderColor: `${color}50` }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: color }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                  <span className="text-sm font-label text-foreground">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        headline="Work with a team that builds for the future."
        subtext="Let's have a conversation about what you're trying to build."
        primaryLabel="Start a Conversation"
        secondaryLabel="View Our Work"
        secondaryTo="/portfolio"
      />
    </>
  )
}
