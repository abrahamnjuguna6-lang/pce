import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const tabs = [
  { value: "web",        label: "Website Dev" },
  { value: "systems",    label: "Systems Dev" },
  { value: "automation", label: "Automation" },
  { value: "ai",         label: "AI Integration" },
  { value: "analytics",  label: "Data & Analytics" },
  { value: "support",    label: "Support" },
]

const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariant = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function ServicesHero({ activeTab, onTabChange }) {
  return (
    <>
      {/* Page header */}
      <header className="pt-32 pb-20 px-8 bg-pce-surface-lowest relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.1),_transparent_60%)]" />

        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <motion.nav
            variants={itemVariant}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6 font-label"
          >
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-foreground">Services</span>
          </motion.nav>

          {/* Headline */}
          <motion.h1
            variants={itemVariant}
            className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-foreground mb-8"
          >
            Our Services
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            variants={itemVariant}
            className="max-w-2xl text-xl text-muted-foreground leading-relaxed"
          >
            PCE Technologies helps businesses implement modern digital infrastructure —
            from custom websites to intelligent AI systems. We build the architecture of tomorrow.
          </motion.p>
        </motion.div>
      </header>

      {/* Sticky tab nav */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-y border-border/30 py-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="flex gap-3 whitespace-nowrap"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.value}
                variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                onClick={() => onTabChange(tab.value)}
                className="relative px-5 py-2 rounded-full text-sm font-bold font-label transition-colors"
                style={{
                  color: activeTab === tab.value ? "var(--primary-foreground)" : undefined,
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {/* Active pill background */}
                <AnimatePresence>
                  {activeTab === tab.value && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-primary shadow-glow-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    />
                  )}
                </AnimatePresence>
                <span
                  className={`relative z-10 transition-colors ${
                    activeTab === tab.value
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}
