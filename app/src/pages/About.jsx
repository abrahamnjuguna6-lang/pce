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
    name: "Emmanuel N.",
    role: "Founder & CEO",
    initials: "EN",
    gradient: "from-primary to-[var(--pce-cyan)]",
    bio: "Driving PCE's vision for intelligent business systems and strategic growth across all verticals.",
    skills: ["Strategy", "Product", "AI Systems"],
  },
  {
    name: "Lead Dev",
    role: "Lead Developer",
    initials: "LD",
    gradient: "from-[var(--pce-cyan)] to-[var(--pce-emerald)]",
    bio: "Full-stack architect with a focus on scalable, maintainable systems built for the long term.",
    skills: ["React", "Node.js", "PostgreSQL"],
  },
  {
    name: "AI Engineer",
    role: "AI Engineer",
    initials: "AE",
    gradient: "from-primary to-[var(--pce-emerald)]",
    bio: "Building the intelligence layer behind our AI products — from LLM pipelines to autonomous agents.",
    skills: ["OpenAI", "LangChain", "Python"],
  },
  {
    name: "Systems Arch",
    role: "Systems Architect",
    initials: "SA",
    gradient: "from-[var(--pce-emerald)] to-primary",
    bio: "Designing the infrastructure that ties everything together — secure, observable, and production-ready.",
    skills: ["AWS", "Docker", "API Design"],
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
      className="relative h-64 cursor-pointer"
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
          className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center`}
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

        {/* Flip hint */}
        <motion.p
          className="text-xs text-muted-foreground flex items-center gap-1"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="material-symbols-outlined text-xs">flip</span>
          Click to see more
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
          <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Skills</p>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
