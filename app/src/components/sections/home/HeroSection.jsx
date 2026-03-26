import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { heroContainer, heroItem, fadeIn, fadeRight } from "@/lib/animations"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-pce-surface-lowest">
      {/* Kinetic gradient */}
      <motion.div
        className="absolute inset-0 kinetic-gradient pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      {/* Grid dot background */}
      <motion.div
        className="absolute inset-0 opacity-10 grid-bg pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      />

      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">

        {/* Left — copy */}
        <motion.div
          className="flex flex-col justify-center space-y-8"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={heroItem} className="flex items-center gap-3">
            <span className="data-pulse-dot" />
            <span className="text-[var(--pce-cyan)] font-label tracking-widest text-xs uppercase">
              Next-Gen Systems Engineering
            </span>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-6xl md:text-7xl font-headline font-bold tracking-tighter leading-[0.9] text-foreground"
          >
            Intelligent Systems for{" "}
            <span className="text-primary">Modern Business.</span>
          </motion.h1>

          <motion.p variants={heroItem} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            PCE Technologies helps businesses transition from manual operations to
            intelligent digital systems through AI, automation, and custom software.
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg">
              <Link to="/contact">Start a Project</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Book Consultation</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right — graphic */}
        <motion.div
          className="hidden lg:flex items-center justify-center relative"
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="absolute w-[120%] h-[120%] bg-primary/10 blur-[120px] rounded-full"
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            className="relative z-10 w-full max-w-md drop-shadow-[0_0_50px_rgba(0,210,253,0.2)]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUKeIZR2ZzdGJwzuRmI3DGvm9FryHVauaxHtcidPFAdNk39xDTINEBYMySQJL4J51SzwpXOaIfOZR5RJHvJJaD0I0EepuX4bGLrMdRjiItnIkUuuXRw-tgTcgdNtlopvFPrsn8heGLgSTPHXdVqBHIXcsYp7XPEcxDBJO0pJiVDfyBAhVl77BOvS0KhAX8bqGnTwxgcsp9pLk0IPeliAKxfSYDBHCPWSCxAejKBU25wCESCt8f-f1Qyniu-gg9xZZwSGY8km4fUEE"
            alt="Abstract circuit architecture"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  )
}
