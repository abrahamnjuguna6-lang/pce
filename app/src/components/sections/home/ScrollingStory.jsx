import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const stages = [
  {
    id: "manual",
    icon: "description",
    label: "Manual Business",
    desc: "Spreadsheets, paperwork, and repetitive tasks consume your team's time.",
    color: "#ffb4ab",
    bg: "rgba(255,180,171,0.08)",
    border: "rgba(255,180,171,0.2)",
    problem: true,
  },
  {
    id: "digital",
    icon: "computer",
    label: "Digital Systems",
    desc: "Custom software replaces manual tools, creating a reliable digital foundation.",
    color: "#b4c5ff",
    bg: "rgba(180,197,255,0.08)",
    border: "rgba(180,197,255,0.2)",
  },
  {
    id: "automation",
    icon: "auto_mode",
    label: "Automation",
    desc: "Workflows run automatically — reports, alerts, and data sync without human input.",
    color: "#2563eb",
    bg: "rgba(37,99,235,0.08)",
    border: "rgba(37,99,235,0.3)",
  },
  {
    id: "ai",
    icon: "psychology",
    label: "AI Intelligence",
    desc: "AI agents learn, predict, and act — your business operates around the clock.",
    color: "#00d2fd",
    bg: "rgba(0,210,253,0.08)",
    border: "rgba(0,210,253,0.3)",
  },
]

function StageCard({ stage, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.35"] })
  const opacity   = useTransform(scrollYProgress, [0, 1], [0.2, 1])
  const scale     = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const x         = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -40 : 40, 0])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, x }}
      className="relative flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl border"
      css={undefined}
    >
      {/* Inline styles via motion */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ background: stage.bg, borderColor: stage.border }}
        initial={false}
      />

      {/* Icon */}
      <div
        className="relative shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center border-2"
        style={{ borderColor: stage.color, background: `${stage.bg}` }}
      >
        <motion.span
          className="material-symbols-outlined text-4xl"
          style={{ color: stage.color }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        >
          {stage.icon}
        </motion.span>
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2"
          style={{ borderColor: stage.color }}
          animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      </div>

      {/* Text */}
      <div className="relative text-center md:text-left">
        <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
          <span className="text-xs font-bold font-label uppercase tracking-widest" style={{ color: stage.color }}>
            Stage {index + 1}
          </span>
          {stage.problem && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
              The Problem
            </span>
          )}
        </div>
        <h3 className="text-2xl font-headline font-bold text-foreground mb-2">{stage.label}</h3>
        <p className="text-muted-foreground leading-relaxed">{stage.desc}</p>
      </div>
    </motion.div>
  )
}

export default function ScrollingStory() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={containerRef} className="py-24 bg-pce-surface-lowest relative">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--pce-cyan)] mb-4 block">
            The Transformation
          </span>
          <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-4">
            Your Journey with PCE
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We guide businesses through every stage — from their first digital system to a fully
            automated, AI-powered operation.
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated vertical progress line */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-pce-outline-variant/20 -translate-x-1/2 hidden md:block" />
          <motion.div
            className="absolute left-[39px] md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-destructive via-primary to-[var(--pce-cyan)] -translate-x-1/2 hidden md:block"
            style={{ height: lineHeight }}
          />

          {/* Arrow connectors between stages */}
          <div className="space-y-6">
            {stages.map((stage, i) => (
              <div key={stage.id}>
                <StageCard stage={stage} index={i} />
                {i < stages.length - 1 && (
                  <motion.div
                    className="flex justify-center py-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.span
                      className="material-symbols-outlined text-primary"
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      arrow_downward
                    </motion.span>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
