import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

// ─── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Floating label field ─────────────────────────────────────────────────────
function FloatingField({ id, name, type = "text", label, required = false, value, onChange, rows }) {
  const [focused, setFocused] = useState(false)
  const active  = focused || value.length > 0
  const isArea  = !!rows
  const Tag     = isArea ? "textarea" : "input"

  // Label position differs for input vs textarea
  const labelInactive = isArea
    ? { top: 14, fontSize: "0.875rem" }
    : { top: "50%", y: "-50%", fontSize: "0.875rem" }
  const labelActive = { top: 7, y: 0, fontSize: "0.68rem" }

  return (
    <div className="relative">
      <Tag
        id={id}
        name={name}
        type={type}
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className={`w-full bg-background rounded-lg px-4 pb-3 text-foreground text-sm
          focus:outline-none resize-none transition-colors duration-200
          ${isArea ? "pt-7" : "pt-6 h-[52px]"}
          border ${focused ? "border-primary" : "border-pce-outline-variant/40"}`}
      />

      {/* Floating label */}
      <motion.label
        htmlFor={id}
        className="absolute left-4 font-label font-medium pointer-events-none leading-none"
        animate={active ? labelActive : labelInactive}
        style={{ color: focused ? "var(--pce-blue)" : "var(--muted-foreground)" }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </motion.label>

      {/* Animated bottom glow line on focus */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-primary rounded-b-lg pointer-events-none"
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        style={{ originX: 0, width: "100%" }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Border glow when focused */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={focused
          ? { boxShadow: "0 0 0 3px rgba(37,99,235,0.15)" }
          : { boxShadow: "0 0 0 0px rgba(37,99,235,0)" }
        }
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}

// ─── Loading dots ─────────────────────────────────────────────────────────────
function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 bg-white rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
        />
      ))}
      <span className="ml-1 text-sm">Sending</span>
    </span>
  )
}

// ─── Success state ────────────────────────────────────────────────────────────
function SuccessState({ onReset }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 space-y-6 text-center"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {/* Icon with radiating rings */}
      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        className="relative flex items-center justify-center"
      >
        {/* Rings 1, 2, 3 */}
        {[1, 1.8, 2.6].map((scale, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-[var(--pce-emerald)]"
            style={{ width: 64, height: 64 }}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale, opacity: 0 }}
            transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut", repeat: Infinity, repeatDelay: 0.8 }}
          />
        ))}

        {/* Icon */}
        <motion.span
          className="material-symbols-outlined text-[var(--pce-emerald)] relative z-10"
          style={{ fontSize: 64, fontVariationSettings: "'FILL' 1" }}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: [0, 1.25, 1], rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          check_circle
        </motion.span>
      </motion.div>

      {/* Text */}
      <motion.div
        variants={fadeUp}
        className="space-y-2"
      >
        <h3 className="font-headline font-bold text-2xl text-foreground">Message Sent!</h3>
        <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
      </motion.div>

      {/* Reset */}
      <motion.div variants={fadeUp}>
        <button
          onClick={onReset}
          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          Send another message
        </button>
      </motion.div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", projectDesc: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1800)
  }

  const handleReset = () => {
    setForm({ name: "", email: "", company: "", projectDesc: "", message: "" })
    setSubmitted(false)
  }

  return (
    <>
      {/* Hero */}
      <header className="pt-36 pb-20 px-8 bg-pce-surface-lowest relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute inset-0 kinetic-gradient" />
        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.nav
            variants={fadeUp}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-foreground">Contact</span>
          </motion.nav>
          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-foreground mb-6"
          >
            Let's Build Something<br />Together.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-xl text-muted-foreground leading-relaxed"
          >
            Tell us about your project and we'll get back to you within 24 hours.
          </motion.p>
        </motion.div>
      </header>

      {/* Contact layout */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12">

          {/* Form card */}
          <motion.div
            className="p-8 bg-pce-surface-low rounded-2xl border border-pce-outline-variant/20"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessState key="success" onReset={handleReset} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-headline font-bold text-2xl text-foreground mb-8">Send Us a Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingField
                        id="name" name="name" label="Full Name" required
                        value={form.name} onChange={handleChange}
                      />
                      <FloatingField
                        id="email" name="email" type="email" label="Email Address" required
                        value={form.email} onChange={handleChange}
                      />
                    </div>

                    <FloatingField
                      id="company" name="company" label="Company Name"
                      value={form.company} onChange={handleChange}
                    />

                    <FloatingField
                      id="projectDesc" name="projectDesc" label="Project Description"
                      rows={4} value={form.projectDesc} onChange={handleChange}
                    />

                    <FloatingField
                      id="message" name="message" label="Message"
                      rows={3} value={form.message} onChange={handleChange}
                    />

                    {/* Submit button */}
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full relative overflow-hidden"
                        disabled={loading}
                      >
                        <AnimatePresence mode="wait">
                          {loading ? (
                            <motion.span
                              key="loading"
                              className="flex items-center justify-center gap-2"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.2 }}
                            >
                              <LoadingDots />
                            </motion.span>
                          ) : (
                            <motion.span
                              key="idle"
                              className="flex items-center justify-center gap-2"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.2 }}
                            >
                              Send Message
                              <span className="material-symbols-outlined text-sm">send</span>
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {/* Loading progress bar */}
                        <AnimatePresence>
                          {loading && (
                            <motion.div
                              className="absolute bottom-0 left-0 h-0.5 bg-white/40"
                              initial={{ scaleX: 0, originX: 0 }}
                              animate={{ scaleX: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1.7, ease: "easeInOut" }}
                              style={{ width: "100%" }}
                            />
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
          >
            {/* Contact details */}
            <motion.div
              variants={fadeUp}
              className="p-8 bg-pce-surface-low rounded-2xl border border-[var(--pce-cyan)]/20 space-y-6"
            >
              <h2 className="font-headline font-bold text-2xl text-foreground">Get in Touch</h2>
              <div className="space-y-5">
                {[
                  { icon: "mail",     text: "hello@pcetechnologies.com" },
                  { icon: "phone",    text: "+1 (555) 000-0000" },
                  { icon: "schedule", text: "We respond within 24 hours", muted: true },
                ].map(({ icon, text, muted }) => (
                  <motion.div
                    key={icon}
                    className="flex items-center gap-4"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      className="material-symbols-outlined text-[var(--pce-cyan)]"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {icon}
                    </motion.span>
                    <span className={muted ? "text-muted-foreground" : "text-foreground"}>{text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="pt-4 border-t border-pce-outline-variant/20">
                <p className="text-sm font-label font-bold text-muted-foreground mb-4">Follow Us</p>
                <div className="flex gap-4">
                  {["LinkedIn", "GitHub", "Twitter"].map((s) => (
                    <motion.a
                      key={s}
                      href="#"
                      className="text-sm text-muted-foreground hover:text-[var(--pce-cyan)] transition-colors"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.15 }}
                    >
                      {s}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Consultation CTA */}
            <motion.div
              variants={fadeUp}
              className="p-8 bg-pce-surface-low rounded-2xl border border-[var(--pce-cyan)]/20 flex flex-col md:flex-row items-start gap-6"
              whileHover={{
                borderColor: "rgba(0,210,253,0.4)",
                boxShadow: "0 0 24px rgba(0,210,253,0.08)",
              }}
              transition={{ duration: 0.25 }}
            >
              <motion.span
                className="material-symbols-outlined text-[var(--pce-cyan)] text-4xl shrink-0"
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              >
                calendar_month
              </motion.span>
              <div className="space-y-3">
                <h3 className="font-headline font-bold text-foreground">Prefer to talk first?</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule a free 30-minute consultation call and let's discuss your goals.
                </p>
                <Button variant="cyan" size="sm">Book a Free Consultation</Button>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </>
  )
}
