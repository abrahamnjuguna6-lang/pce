import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import ScrollReveal from "@/components/common/ScrollReveal"
import { staggerContainer, fadeUp } from "@/lib/animations"

const services = [
  {
    icon: "terminal",
    title: "Website Development",
    shortDesc: "High-performance web applications built for scale.",
    fullDesc: "Custom websites, portals, and platforms — SEO-optimised, lightning-fast, and built with modern frameworks like React and Next.js.",
    tags: ["React", "Next.js", "CMS"],
    color: "#2563eb",
  },
  {
    icon: "settings_suggest",
    title: "Business Systems",
    shortDesc: "Custom ERP and internal tools for your operations.",
    fullDesc: "Inventory systems, HR tools, management dashboards — bespoke software that fits exactly how your business works.",
    tags: ["Custom ERP", "Dashboards", "Internal Tools"],
    color: "#00d2fd",
  },
  {
    icon: "auto_mode",
    title: "Automation Solutions",
    shortDesc: "Remove manual friction with intelligent automation.",
    fullDesc: "Automated reports, workflow triggers, data sync, and scheduled tasks — your operations run 24/7 without lifting a finger.",
    tags: ["n8n", "Zapier", "Workflows"],
    color: "#4edea3",
  },
  {
    icon: "forum",
    title: "AI Chatbots & Agents",
    shortDesc: "Deploy intelligent LLM agents for your business.",
    fullDesc: "AI-powered customer support, internal assistants, and automated responses trained on your data and brand voice.",
    tags: ["OpenAI", "LangChain", "NLP"],
    color: "#00d2fd",
  },
  {
    icon: "analytics",
    title: "Data Dashboards",
    shortDesc: "Real-time metrics and business intelligence.",
    fullDesc: "Custom KPI dashboards that pull from all your data sources and deliver actionable insights to your team in real time.",
    tags: ["Plotly", "Streamlit", "SQL"],
    color: "#2563eb",
  },
  {
    icon: "hub",
    title: "System Integration",
    shortDesc: "Connect your tools into one unified ecosystem.",
    fullDesc: "API integrations, webhooks, and data pipelines that eliminate silos and let your software stack work as one.",
    tags: ["REST APIs", "Webhooks", "ETL"],
    color: "#4edea3",
  },
]

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      className="relative overflow-hidden rounded-xl border border-pce-outline-variant/20 bg-pce-surface-low cursor-pointer h-full"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        y: -8,
        borderColor: service.color + "60",
        boxShadow: `0 0 32px ${service.color}20, 0 8px 32px rgba(0,0,0,0.4)`,
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Base content — hidden when overlay is active to prevent text bleed-through */}
      <div className={`p-8 space-y-4 h-full transition-opacity duration-200 ${hovered ? "opacity-0" : "opacity-100"}`}>
        <motion.span
          className="material-symbols-outlined text-4xl block"
          style={{ color: service.color }}
          animate={hovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {service.icon}
        </motion.span>
        <h3 className="text-xl font-headline font-bold text-foreground">{service.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">{service.shortDesc}</p>
      </div>

      {/* Hover reveal overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 p-8 flex flex-col justify-between"
            style={{ background: `linear-gradient(135deg, var(--pce-surface-container) 60%, ${service.color}22)` }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl" style={{ color: service.color }}>
                  {service.icon}
                </span>
                <h3 className="font-headline font-bold text-foreground">{service.title}</h3>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{service.fullDesc}</p>
            </div>

            <div className="space-y-3">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full border font-label font-bold"
                    style={{ borderColor: service.color + "40", color: service.color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* CTA */}
              <Link
                to="/services"
                className="inline-flex items-center gap-1 text-sm font-bold transition-all"
                style={{ color: service.color }}
              >
                Learn more
                <motion.span
                  className="material-symbols-outlined text-sm"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  arrow_forward
                </motion.span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom glow edge */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: service.color }}
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-4xl font-headline font-bold tracking-tight mb-4 text-foreground">
              What We Build
            </h2>
            <div className="w-12 h-1 bg-primary" />
          </div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="text-primary font-bold inline-flex items-center gap-2 group hover:gap-3 transition-all"
            >
              View all services
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
