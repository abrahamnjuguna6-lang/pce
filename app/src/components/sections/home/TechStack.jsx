import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"

const techCategories = [
  {
    icon: "code_blocks",
    label: "Web Frameworks",
    techs: ["React", "Next.js", "Vite"],
    color: "#2563eb",
  },
  {
    icon: "cloud_done",
    label: "Cloud Platforms",
    techs: ["AWS", "GCP", "Vercel"],
    color: "#00d2fd",
  },
  {
    icon: "robot",
    label: "AI Integrations",
    techs: ["OpenAI", "LangChain", "HuggingFace"],
    color: "#4edea3",
  },
  {
    icon: "sync_alt",
    label: "Automation Tools",
    techs: ["n8n", "Zapier", "Make"],
    color: "#2563eb",
  },
]

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

const techBadgeVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay: 0.3 + i * 0.08, ease: "easeOut" },
  }),
}

export default function TechStack() {
  return (
    <section className="py-24 bg-pce-surface-lowest">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <motion.h2
          className="text-2xl font-headline font-bold mb-16 uppercase tracking-widest text-muted-foreground"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technologies We Work With
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-12 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {techCategories.map(({ icon, label, techs, color }, i) => (
            <motion.div
              key={label}
              custom={i}
              variants={itemVariant}
              className="flex flex-col items-center gap-4 group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center border-2"
                style={{ borderColor: color + "40", background: color + "10" }}
                whileHover={{ borderColor: color + "80", background: color + "20" }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ color }}
                >
                  {icon}
                </span>
              </motion.div>

              {/* Category label */}
              <span className="text-xs font-bold font-label tracking-widest text-muted-foreground uppercase group-hover:text-foreground transition-colors">
                {label}
              </span>

              {/* Tech badges */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {techs.map((tech, j) => (
                  <motion.span
                    key={tech}
                    custom={i * 3 + j}
                    variants={techBadgeVariant}
                    className="text-xs px-2 py-0.5 rounded-full border font-label"
                    style={{ borderColor: color + "30", color: color + "cc" }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
