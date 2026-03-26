import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/common/ScrollReveal"
import { scaleIn } from "@/lib/animations"

export default function CTABanner({
  headline = "Ready to Transform Your Business?",
  subtext = "Join the forward-thinking organisations that have automated their growth with PCE Technologies.",
  primaryLabel = "Start a Project",
  primaryTo = "/contact",
  secondaryLabel = "Contact Us",
  secondaryTo = "/contact",
}) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal variant={scaleIn}>
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-pce-surface-container border border-pce-outline-variant/20 p-12 md:p-20"
            whileHover={{ boxShadow: "0 0 60px rgba(37,99,235,0.12)" }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none" />
            {/* Animated glow orb */}
            <motion.div
              className="absolute top-1/2 right-12 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -translate-y-1/2"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6 text-foreground">
                {headline}
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">{subtext}</p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to={primaryTo}>{primaryLabel}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to={secondaryTo}>{secondaryLabel}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
