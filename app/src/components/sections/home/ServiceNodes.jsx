import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ScrollReveal from "@/components/common/ScrollReveal"
import { fadeUp } from "@/lib/animations"

const nodes = [
  {
    id: "web",
    icon: "terminal",
    label: "Website Dev",
    color: "#2563eb",
    glow: "rgba(37,99,235,0.4)",
    desc: "High-performance websites, platforms, and client portals built for scale.",
    x: "15%", y: "20%",
  },
  {
    id: "systems",
    icon: "settings_suggest",
    label: "Business Systems",
    color: "#00d2fd",
    glow: "rgba(0,210,253,0.4)",
    desc: "Custom ERP, dashboards, and internal tools tailored to your operations.",
    x: "75%", y: "15%",
  },
  {
    id: "automation",
    icon: "auto_mode",
    label: "Automation",
    color: "#4edea3",
    glow: "rgba(78,222,163,0.4)",
    desc: "Eliminate repetitive tasks with intelligent workflow automation.",
    x: "5%",  y: "60%",
  },
  {
    id: "ai",
    icon: "psychology",
    label: "AI & Agents",
    color: "#00d2fd",
    glow: "rgba(0,210,253,0.5)",
    desc: "AI chatbots, automated responses, and intelligent assistants.",
    x: "50%", y: "8%",
  },
  {
    id: "data",
    icon: "analytics",
    label: "Data Dashboards",
    color: "#2563eb",
    glow: "rgba(37,99,235,0.4)",
    desc: "Real-time analytics and KPI dashboards that drive decisions.",
    x: "82%", y: "58%",
  },
  {
    id: "integration",
    icon: "hub",
    label: "Integration",
    color: "#4edea3",
    glow: "rgba(78,222,163,0.4)",
    desc: "Connect all your tools into one unified, high-speed ecosystem.",
    x: "40%", y: "72%",
  },
]

// SVG lines connecting nodes (approximate positions)
const connections = [
  [0, 3], [3, 1], [1, 4], [4, 5], [5, 2], [2, 0], [3, 4], [0, 5],
]

function NodeCard({ node, isActive, onClick }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: nodes.indexOf(node) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Tooltip card */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-56 bg-pce-surface-container border border-pce-outline-variant/30 rounded-xl p-4 shadow-2xl z-20 pointer-events-none"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-bold text-foreground mb-1">{node.label}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{node.desc}</p>
            <div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-pce-surface-container border-r border-b border-pce-outline-variant/30"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node circle */}
      <motion.button
        onClick={onClick}
        className="relative flex flex-col items-center gap-2 group"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {/* Outer pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: node.glow }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: nodes.indexOf(node) * 0.3 }}
        />
        {/* Icon circle */}
        <motion.div
          className="relative w-14 h-14 rounded-full flex items-center justify-center border-2"
          style={{
            background: isActive ? node.color : "var(--pce-surface-container)",
            borderColor: node.color,
            boxShadow: isActive ? `0 0 24px ${node.glow}` : "none",
          }}
          animate={isActive ? {} : {
            boxShadow: [`0 0 8px ${node.glow}`, `0 0 20px ${node.glow}`, `0 0 8px ${node.glow}`],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ color: isActive ? "#fff" : node.color }}
          >
            {node.icon}
          </span>
        </motion.div>
        {/* Label */}
        <span className="text-xs font-bold font-label text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
          {node.label}
        </span>
      </motion.button>
    </motion.div>
  )
}

export default function ServiceNodes() {
  const [activeNode, setActiveNode] = useState(null)
  const navigate = useNavigate()

  const handleClick = (node) => {
    navigate("/services")
  }

  const handleHover = (id) => setActiveNode(id)
  const handleLeave = () => setActiveNode(null)

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-4">
              What We Build
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto mb-4" />
            <p className="text-muted-foreground">
              Hover a node to explore · Click to learn more
            </p>
          </div>
        </ScrollReveal>

        {/* Node canvas */}
        <div className="relative w-full h-[480px] md:h-[520px] overflow-hidden">
          {/* SVG connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {connections.map(([a, b], i) => {
              const na = nodes[a], nb = nodes[b]
              const isHighlighted = activeNode === na.id || activeNode === nb.id
              return (
                <motion.line
                  key={i}
                  x1={na.x} y1={na.y}
                  x2={nb.x} y2={nb.y}
                  stroke={isHighlighted ? "#2563eb" : "#434655"}
                  strokeWidth={isHighlighted ? 1.5 : 0.8}
                  strokeOpacity={isHighlighted ? 0.6 : 0.3}
                  strokeDasharray={isHighlighted ? "0" : "4 4"}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.08 }}
                />
              )
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              onMouseEnter={() => handleHover(node.id)}
              onMouseLeave={handleLeave}
              style={{ position: "absolute", left: node.x, top: node.y, transform: "translate(-50%, -50%)", zIndex: 10 }}
            >
              <NodeCard
                node={node}
                isActive={activeNode === node.id}
                onClick={() => handleClick(node)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
