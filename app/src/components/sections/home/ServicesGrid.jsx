import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import ScrollReveal from "@/components/common/ScrollReveal"
import { staggerContainer, fadeUp } from "@/lib/animations"

const services = [
  { icon: "terminal",         title: "Website Development",        desc: "High-performance web applications built for scale and conversion." },
  { icon: "settings_suggest", title: "Business Systems",           desc: "Custom ERP and internal tools tailored to your unique operational flow." },
  { icon: "auto_mode",        title: "Automation Solutions",       desc: "Removing manual friction through sophisticated robotic process automation." },
  { icon: "forum",            title: "AI Chatbots & Agents",       desc: "Deploying intelligent LLM agents for customer support and data analysis." },
  { icon: "analytics",        title: "Data Dashboards",            desc: "Real-time visibility into your business metrics with interactive visualisations." },
  { icon: "hub",              title: "System Integration",         desc: "Connecting disparate software silos into a unified, high-speed ecosystem." },
]

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map(({ icon, title, desc }) => (
            <motion.div key={title} variants={fadeUp}>
              <Card animate className="p-8 bg-pce-surface-low h-full cursor-pointer">
                <CardContent className="p-0 space-y-4">
                  <span className="material-symbols-outlined text-[var(--pce-cyan)] text-4xl block">
                    {icon}
                  </span>
                  <h3 className="text-xl font-headline font-bold text-foreground">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              View all services
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
