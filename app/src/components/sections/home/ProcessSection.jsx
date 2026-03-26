import { motion } from "framer-motion"
import ScrollReveal from "@/components/common/ScrollReveal"
import { stepItem, staggerContainer } from "@/lib/animations"

const steps = [
  { number: "1", title: "Consultation",   desc: "Deep dive into your operations and pain points." },
  { number: "2", title: "System Design",  desc: "Architecting the blueprint for your digital ecosystem." },
  { number: "3", title: "Development",    desc: "Rapid builds using clean, scalable codebases." },
  { number: "4", title: "Integration",    desc: "Deploying and syncing with existing platforms." },
  { number: "5", title: "Support",        desc: "Ongoing optimisation and maintenance." },
]

export default function ProcessSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground">
              Our Process
            </h2>
            <p className="text-muted-foreground mt-4">
              A proven journey from initial concept to lifecycle support.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Animated connecting line */}
          <motion.div
            className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-primary via-[var(--pce-cyan)] to-pce-surface-container hidden lg:block"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map(({ number, title, desc }) => (
              <motion.div
                key={number}
                variants={stepItem}
                className="flex flex-col items-center text-center space-y-6"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 28px rgba(37,99,235,0.5)" }}
                  transition={{ duration: 0.2 }}
                >
                  {number}
                </motion.div>
                <div>
                  <h3 className="text-xl font-headline font-bold mb-2 text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
