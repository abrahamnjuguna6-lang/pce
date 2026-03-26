import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

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
    }, 1500)
  }

  return (
    <>
      {/* Hero */}
      <header className="pt-36 pb-20 px-8 bg-pce-surface-lowest relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute inset-0 kinetic-gradient" />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-foreground">Contact</span>
          </nav>
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-foreground mb-6">
            Let's Build Something<br />Together.
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>
      </header>

      {/* Contact layout */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12">

          {/* Form */}
          <Card className="p-8 bg-pce-surface-low border-pce-outline-variant/20">
            <h2 className="font-headline font-bold text-2xl text-foreground mb-8">Send Us a Message</h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
                <span className="material-symbols-outlined text-[var(--pce-emerald)] text-6xl">check_circle</span>
                <h3 className="font-headline font-bold text-2xl text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-label font-medium text-foreground" htmlFor="name">Full Name</label>
                    <input
                      id="name" name="name" type="text" required
                      placeholder="Your full name"
                      value={form.name} onChange={handleChange}
                      className="w-full bg-background border border-pce-outline-variant/40 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-label font-medium text-foreground" htmlFor="email">Email Address</label>
                    <input
                      id="email" name="email" type="email" required
                      placeholder="your@email.com"
                      value={form.email} onChange={handleChange}
                      className="w-full bg-background border border-pce-outline-variant/40 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-label font-medium text-foreground" htmlFor="company">Company Name</label>
                  <input
                    id="company" name="company" type="text"
                    placeholder="Your company"
                    value={form.company} onChange={handleChange}
                    className="w-full bg-background border border-pce-outline-variant/40 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-label font-medium text-foreground" htmlFor="projectDesc">Project Description</label>
                  <textarea
                    id="projectDesc" name="projectDesc" rows={4}
                    placeholder="Describe your project or challenge..."
                    value={form.projectDesc} onChange={handleChange}
                    className="w-full bg-background border border-pce-outline-variant/40 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-label font-medium text-foreground" htmlFor="message">Message</label>
                  <textarea
                    id="message" name="message" rows={3}
                    placeholder="Anything else you'd like to add?"
                    value={form.message} onChange={handleChange}
                    className="w-full bg-background border border-pce-outline-variant/40 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : "Send Message"}
                </Button>
              </form>
            )}
          </Card>

          {/* Contact details */}
          <div className="space-y-6">
            <Card className="p-8 bg-pce-surface-low accent-card-cyan space-y-6">
              <h2 className="font-headline font-bold text-2xl text-foreground">Get in Touch</h2>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[var(--pce-cyan)]">mail</span>
                  <span className="text-foreground">hello@pcetechnologies.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[var(--pce-cyan)]">phone</span>
                  <span className="text-foreground">+1 (555) 000-0000</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[var(--pce-cyan)]">schedule</span>
                  <span className="text-muted-foreground">We respond within 24 hours</span>
                </div>
              </div>
              <div className="pt-4 border-t border-pce-outline-variant/20">
                <p className="text-sm font-label font-bold text-muted-foreground mb-4">Follow Us</p>
                <div className="flex gap-4">
                  {["LinkedIn", "GitHub", "Twitter"].map((s) => (
                    <a key={s} href="#" className="text-sm text-muted-foreground hover:text-[var(--pce-cyan)] transition-colors">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </Card>

            {/* Consultation CTA */}
            <Card className="p-8 bg-pce-surface-low border-[var(--pce-cyan)]/20 flex flex-col md:flex-row items-start gap-6">
              <span className="material-symbols-outlined text-[var(--pce-cyan)] text-4xl shrink-0">calendar_month</span>
              <div className="space-y-3">
                <h3 className="font-headline font-bold text-foreground">Prefer to talk first?</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule a free 30-minute consultation call and let's discuss your goals.
                </p>
                <Button variant="cyan" size="sm">Book a Free Consultation</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
