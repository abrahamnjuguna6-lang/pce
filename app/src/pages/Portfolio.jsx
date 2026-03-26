import { useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CTABanner from "@/components/common/CTABanner"

const filters = ["All", "Automation", "AI", "Web", "Systems"]

const projects = [
  {
    title: "Retail Inventory Dashboard",
    category: "Systems",
    tags: ["React", "Node.js", "PostgreSQL"],
    problem: "Manual stock tracking causing oversells",
    desc: "Built a real-time inventory system with automated low-stock alerts, supplier integration, and purchase order automation.",
  },
  {
    title: "AI Customer Support Agent",
    category: "AI",
    tags: ["Python", "OpenAI", "FastAPI"],
    problem: "High support volume overwhelming the team",
    desc: "Deployed an AI agent handling 80% of customer queries automatically with intelligent human escalation for complex issues.",
  },
  {
    title: "Logistics Workflow Automation",
    category: "Automation",
    tags: ["n8n", "Zapier", "REST APIs"],
    problem: "Manual data entry across 5 disconnected systems",
    desc: "Automated end-to-end shipment tracking and reporting, saving 20+ hours per week across the operations team.",
  },
  {
    title: "Internal HR Management Portal",
    category: "Systems",
    tags: ["Next.js", "Supabase"],
    problem: "Spreadsheet chaos for HR and onboarding",
    desc: "Replaced Excel-based HR tracking with a custom portal featuring automated onboarding flows and document management.",
  },
  {
    title: "Sales Analytics Dashboard",
    category: "Systems",
    tags: ["Python", "Plotly", "Streamlit"],
    problem: "No visibility into pipeline or conversion data",
    desc: "Created live KPI dashboards pulling from CRM and financial data sources with daily automated reporting.",
  },
  {
    title: "E-Commerce Platform",
    category: "Web",
    tags: ["Next.js", "Stripe", "Tailwind"],
    problem: "Outdated storefront with poor conversion",
    desc: "Rebuilt the storefront with modern UX patterns, optimised checkout, and a 40% conversion rate improvement.",
  },
]

const techGroups = [
  { label: "Frontend",   items: ["React", "Next.js", "Vue"] },
  { label: "Backend",    items: ["Node.js", "Python", "FastAPI"] },
  { label: "Data",       items: ["PostgreSQL", "Supabase", "MongoDB"] },
  { label: "Automation", items: ["n8n", "Zapier"] },
  { label: "AI",         items: ["OpenAI", "LangChain"] },
  { label: "Cloud",      items: ["AWS", "GCP", "Vercel"] },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <>
      {/* Hero */}
      <header className="pt-36 pb-20 px-8 bg-pce-surface-lowest relative overflow-hidden">
        <div className="absolute inset-0 kinetic-gradient" />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-foreground">Portfolio</span>
          </nav>
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-foreground mb-6">
            Our Work
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
            A showcase of systems, platforms, and intelligent tools we've delivered for businesses.
          </p>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-bold font-label transition-all ${
                  activeFilter === f
                    ? "bg-primary text-primary-foreground shadow-glow-sm"
                    : "bg-pce-surface-high text-muted-foreground hover:bg-pce-surface-highest"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(({ title, tags, problem, desc }) => (
              <Card key={title} glow className="p-6 bg-pce-surface-low group relative overflow-hidden">
                <CardContent className="p-0 space-y-4">
                  <h3 className="font-headline font-bold text-xl text-foreground">{title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="cyan">{tag}</Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-bold text-foreground">Problem: </span>{problem}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  <div className="pt-2">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After */}
      <section className="py-24 bg-pce-surface-lowest">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-16 text-center">
            Before vs. After
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8">
              <h3 className="font-headline font-bold text-destructive mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">cancel</span> Before
              </h3>
              <ul className="space-y-3">
                {["Slow response times (8+ hour SLA)", "Overwhelmed support staff", "Inconsistent answers across agents", "High operational cost per ticket"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="material-symbols-outlined text-destructive text-sm mt-0.5">close</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-6xl rotate-90 lg:rotate-0">arrow_forward</span>
            </div>
            <div className="bg-[var(--pce-emerald)]/5 border border-[var(--pce-emerald)]/20 rounded-2xl p-8">
              <h3 className="font-headline font-bold text-[var(--pce-emerald)] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span> After
              </h3>
              <ul className="space-y-3">
                {["24/7 instant responses under 2 seconds", "80% of queries handled automatically", "Consistent, accurate answers every time", "Cost reduced by 60%"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="material-symbols-outlined text-[var(--pce-emerald)] text-sm mt-0.5">check</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-foreground mb-16 text-center">
            Technologies Behind Our Work
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {techGroups.map(({ label, items }) => (
              <div key={label} className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
                {items.map((item) => (
                  <Badge key={item} variant="muted" className="block text-center">{item}</Badge>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Have a project in mind?"
        subtext="We'd love to hear about your challenges and what you're looking to build."
        primaryLabel="Let's Build It Together"
        secondaryLabel="View Services"
        secondaryTo="/services"
      />
    </>
  )
}
