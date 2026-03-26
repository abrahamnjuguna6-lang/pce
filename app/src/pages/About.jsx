import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import CTABanner from "@/components/common/CTABanner"

const team = [
  { name: "Emmanuel N.",  role: "Founder & CEO",       bio: "Driving PCE's vision for intelligent business systems." },
  { name: "Lead Dev",     role: "Lead Developer",      bio: "Full-stack architect with a focus on scalable systems." },
  { name: "AI Engineer",  role: "AI Engineer",         bio: "Building the intelligence layer behind our AI products." },
  { name: "Systems Arch", role: "Systems Architect",   bio: "Designing the infrastructure that ties it all together." },
]

const philosophy = [
  { icon: "lightbulb",    title: "Innovation First",      desc: "We embrace emerging technologies and apply them where they create real value, not just where they're trendy." },
  { icon: "auto_mode",    title: "Automation by Default", desc: "If it's repetitive, we automate it. We build systems that work for your business around the clock." },
  { icon: "psychology",   title: "Intelligence at Scale", desc: "From AI chatbots to analytics dashboards, we embed intelligence into every layer of what we build." },
]

const techApproach = [
  "Scalable Architecture",
  "Modern Tech Stack",
  "Clean Maintainable Code",
  "Long-Term Thinking",
  "Security First",
  "API-First Design",
]

export default function About() {
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
            <span className="text-foreground">About</span>
          </nav>
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-foreground mb-6">
            About PCE<br />Technologies
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
            Building the intelligent infrastructure of tomorrow's businesses.
          </p>
        </div>
      </header>

      {/* Company Overview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-6">Who We Are</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              PCE Technologies is a technology consultancy that helps businesses transition from manual,
              disconnected operations to intelligent, automated digital systems. We design, build, and
              support custom software solutions tailored to each client's unique challenges.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From small and medium enterprises to growing logistics and retail businesses, we deliver
              solutions that create real, measurable impact.
            </p>
          </div>
          <div className="bg-pce-surface-low rounded-2xl p-10 border border-pce-outline-variant/20 card-glow flex items-center justify-center min-h-64">
            <div className="grid grid-cols-3 gap-6 opacity-60">
              {["code", "psychology", "auto_mode", "hub", "analytics", "cloud_done"].map((icon) => (
                <span key={icon} className="material-symbols-outlined text-[var(--pce-cyan)] text-4xl flex items-center justify-center">
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-pce-surface-lowest">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 bg-pce-surface-low accent-card-blue">
            <CardContent className="p-0 space-y-4">
              <span className="material-symbols-outlined text-primary text-3xl">visibility</span>
              <h3 className="text-2xl font-headline font-bold text-foreground">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where every business, regardless of size, has access to intelligent systems
                that let them compete, grow, and operate without limits.
              </p>
            </CardContent>
          </Card>
          <Card className="p-8 bg-pce-surface-low accent-card-cyan">
            <CardContent className="p-0 space-y-4">
              <span className="material-symbols-outlined text-[var(--pce-cyan)] text-3xl">flag</span>
              <h3 className="text-2xl font-headline font-bold text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver modern, scalable technology solutions that eliminate inefficiency, automate
                the repetitive, and empower businesses through data and AI.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-16">What We Believe In</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {philosophy.map(({ icon, title, desc }) => (
              <div key={title} className="space-y-4">
                <span className="material-symbols-outlined text-[var(--pce-cyan)] text-5xl">{icon}</span>
                <h3 className="text-xl font-headline font-bold text-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-pce-surface-lowest">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-16 text-center">
            The People Behind PCE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(({ name, role, bio }) => (
              <Card key={name} glow className="p-6 bg-pce-surface-low text-center">
                <CardContent className="p-0 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-[var(--pce-cyan)] mx-auto flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-3xl">person</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-foreground">{name}</h3>
                    <p className="text-sm text-[var(--pce-cyan)]">{role}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{bio}</p>
                  <a href="#" className="inline-block text-muted-foreground hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">link</span>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Approach */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground mb-8">How We Build</h2>
            <ul className="space-y-4">
              {techApproach.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[var(--pce-emerald)]">check_circle</span>
                  <span className="font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-pce-surface-low rounded-2xl p-10 border border-pce-outline-variant/20 card-glow">
            <div className="space-y-3">
              {["Frontend Layer", "API / Backend", "Data Layer", "AI Services", "Cloud Infrastructure"].map((layer, i) => (
                <div key={layer} className="flex items-center gap-4 p-3 bg-pce-surface-container rounded-lg border border-pce-outline-variant/20">
                  <div className="w-2 h-2 rounded-full" style={{ background: i === 0 ? "var(--pce-cyan)" : i === 4 ? "var(--pce-emerald)" : "var(--pce-blue)" }} />
                  <span className="text-sm font-label text-foreground">{layer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Work with a team that builds for the future."
        subtext="Let's have a conversation about what you're trying to build."
        primaryLabel="Start a Conversation"
        secondaryLabel="View Our Work"
        secondaryTo="/portfolio"
      />
    </>
  )
}
