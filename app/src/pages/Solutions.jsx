import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CTABanner from "@/components/common/CTABanner"

const challenges = [
  { icon: "sync_problem",  title: "Inefficient Workflows",    desc: "Repetitive tasks drain time and resources across your team every day." },
  { icon: "person_off",    title: "Manual Processes",         desc: "Error-prone, human-dependent operations slow growth and introduce risk." },
  { icon: "link_off",      title: "Disconnected Systems",     desc: "Siloed tools create data gaps and communication failures." },
  { icon: "bar_chart_off", title: "Lack of Analytics",        desc: "Decisions made without data lead to missed opportunities and wasted spend." },
]

const comparisons = [
  { problem: "Hours spent on manual reporting",        solution: "Automated reports delivered on schedule" },
  { problem: "Stock errors from manual tracking",      solution: "Live inventory with smart alerts" },
  { problem: "Overwhelmed support teams",              solution: "AI agents handling 80% of queries" },
  { problem: "Data scattered across spreadsheets",     solution: "Centralised real-time dashboards" },
]

const implementations = [
  { icon: "bar_chart",     title: "Automated Reporting Systems",   desc: "Real-time data compiled and delivered to decision-makers on schedule." },
  { icon: "inventory_2",   title: "Inventory Management Systems",  desc: "Live stock tracking, low-stock alerts, and supplier integrations." },
  { icon: "support_agent", title: "AI Customer Service Agents",    desc: "24/7 intelligent support without increasing headcount." },
  { icon: "dashboard",     title: "Internal Dashboards",           desc: "Centralised control panels for operations, finance, and HR teams." },
]

const industries = ["Retail", "Logistics", "Education", "Professional Services", "SMEs"]

export default function Solutions() {
  return (
    <>
      {/* Hero */}
      <header className="min-h-[60vh] flex items-end pb-20 pt-36 px-8 bg-pce-surface-lowest relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute inset-0 kinetic-gradient" />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-foreground">Solutions</span>
          </nav>
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-foreground mb-6">
            From Manual<br />to Intelligent.
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
            We help businesses replace slow manual processes with intelligent digital systems
            that work for them 24/7.
          </p>
        </div>
      </header>

      {/* Challenges */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-16">
            Challenges Businesses Face
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {challenges.map(({ icon, title, desc }) => (
              <Card key={title} className="p-6 bg-pce-surface-low border-destructive/20">
                <CardContent className="p-0 space-y-4">
                  <span className="material-symbols-outlined text-destructive text-3xl">{icon}</span>
                  <h3 className="font-headline font-bold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How PCE Solves It */}
      <section className="py-24 bg-pce-surface-lowest">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-16 text-center">
            How PCE Solves It
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            {/* Problems */}
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-widest text-destructive mb-6">The Problem</p>
              {comparisons.map(({ problem }) => (
                <div key={problem} className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <span className="material-symbols-outlined text-destructive text-sm">close</span>
                  <span className="text-foreground text-sm">{problem}</span>
                </div>
              ))}
            </div>
            {/* Arrow */}
            <div className="flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-6xl rotate-90 lg:rotate-0">arrow_forward</span>
            </div>
            {/* Solutions */}
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-widest text-[var(--pce-emerald)] mb-6">The PCE Solution</p>
              {comparisons.map(({ solution }) => (
                <div key={solution} className="flex items-center gap-3 p-4 bg-[var(--pce-emerald)]/10 border border-[var(--pce-emerald)]/20 rounded-lg">
                  <span className="material-symbols-outlined text-[var(--pce-emerald)] text-sm">check</span>
                  <span className="text-foreground text-sm">{solution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Example Implementations */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-16">
            What This Looks Like in Practice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {implementations.map(({ icon, title, desc }) => (
              <Card key={title} glow className="p-6 bg-pce-surface-low">
                <CardContent className="p-0 space-y-4">
                  <span className="material-symbols-outlined text-[var(--pce-cyan)] text-3xl">{icon}</span>
                  <h3 className="font-headline font-bold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                  <Link to="/contact" className="text-primary text-sm font-bold inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-pce-surface-lowest">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-16">Who We Work With</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry) => (
              <Badge key={industry} variant="muted" className="px-6 py-3 text-base">{industry}</Badge>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Start your transformation today."
        subtext="Book a free consultation and let's map out your path to intelligent systems."
        primaryLabel="Start a Project"
        secondaryLabel="View Our Services"
        secondaryTo="/services"
      />
    </>
  )
}
