import { motion } from "framer-motion"
import ScrollReveal from "@/components/common/ScrollReveal"
import { staggerContainer, fadeUp } from "@/lib/animations"

const highlights = [
  { icon: "verified",   label: "6 Core Services" },
  { icon: "smart_toy",  label: "AI-Powered Solutions" },
  { icon: "speed",      label: "End-to-End Delivery" },
]

export default function WhatWeDoStrip() {
  return (
    <section className="py-24 bg-pce-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-center text-center space-y-12">
          <ScrollReveal>
            <p className="max-w-2xl text-xl font-medium text-muted-foreground leading-relaxed">
              We are a specialised engineering firm dedicated to building the high-performance
              digital backbone that powers today's leading enterprises.
            </p>
          </ScrollReveal>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {highlights.map(({ icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="bg-pce-surface-low px-6 py-3 rounded-full border border-pce-outline-variant/20 flex items-center gap-3"
                whileHover={{ scale: 1.05, borderColor: "rgba(0,210,253,0.4)" }}
                transition={{ duration: 0.2 }}
              >
                <span className="material-symbols-outlined text-[var(--pce-cyan)] text-xl">{icon}</span>
                <span className="font-label font-semibold text-foreground">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Glow divider */}
        <motion.div
          className="mt-20 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--pce-cyan)]/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  )
}
