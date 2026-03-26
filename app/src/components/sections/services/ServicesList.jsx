import { Badge } from "@/components/ui/badge"

const services = [
  {
    id: "web",
    icon: "terminal",
    title: "Website Development",
    desc: "We deliver high-performance, SEO-optimised web experiences that convert visitors into loyal customers. Our stack focuses on speed, security, and scalability.",
    tags: ["Custom Builds", "CMS Integration", "Client Portals", "E-Commerce"],
    tagVariant: "default",
    flip: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGYD73TPAV7THCcqd4M9VU9kL-pLarPkxX6Jr4HNpLHMUl5c7YN3XjN52xt3nL5nT3JBhZnrWSrH8vsO6Sr65ShxLoo9LbFZZz-T9sqO9_WL9WUuteFR412ER3Ql0T_P29Cn1DonLrhkDb__LPLTYCFztRcEA47gRPH342bMk01koV3FCOIbMvBDmuvYDKYjuDUiaIS7QduXA9vpmwbZSol9KGVHb2YXaDqRFokMop_WlyrIzWNiuSDaDI7-rHHardghI8ccjRu-I",
  },
  {
    id: "systems",
    icon: "database",
    title: "Business Systems Development",
    desc: "Custom-engineered internal tools that streamline your operations. We translate complex business logic into intuitive, powerful software systems.",
    tags: ["Inventory Systems", "Management Dashboards", "Internal Tools", "Custom ERP"],
    tagVariant: "muted",
    flip: true,
    graphic: true,
  },
  {
    id: "automation",
    icon: "auto_mode",
    title: "Automation Systems",
    desc: "Eliminate repetitive tasks and build workflows that run 24/7 without human intervention.",
    tags: [],
    bullets: [
      { icon: "auto_graph", title: "Automated Reports",      desc: "Real-time data compilation delivered to your inbox daily." },
      { icon: "account_tree", title: "Workflow Automation",  desc: "Eliminate repetitive tasks with intelligent triggers and actions." },
      { icon: "sync",        title: "Data Synchronization",  desc: "Keep all your third-party platforms in perfect harmony." },
      { icon: "schedule",    title: "Scheduled Tasks",       desc: "Heavy lifting performed during off-peak hours, automatically." },
    ],
    flip: false,
  },
  {
    id: "ai",
    icon: "psychology",
    title: "AI Integration",
    badge: "Powered by Latest AI Models",
    desc: "Deploy cutting-edge AI tools that work autonomously to serve your customers and your team.",
    features: [
      { icon: "chat",       title: "AI Chatbots",           desc: "Intelligent customer support available 24/7." },
      { icon: "quickreply", title: "Automated Responses",   desc: "Instant, context-aware replies for email and messaging." },
      { icon: "smart_toy",  title: "AI Assistants",         desc: "Personalised internal tools for staff productivity." },
      { icon: "translate",  title: "NLP",                   desc: "Advanced natural language processing for data extraction." },
    ],
    flip: false,
    special: "ai",
  },
  {
    id: "analytics",
    icon: "analytics",
    title: "Data & Analytics",
    desc: "Transform raw data into actionable insights. We build custom visualisation layers that help you track KPIs and monitor business health in real-time.",
    tags: ["Real-Time Dashboards", "KPI Tracking", "Custom Reports", "Data Visualisation"],
    tagVariant: "cyan",
    flip: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKG9iFBdAr-qde-9JxtnmlYHjSpJTAdeN1b9jFDQkaVnBP03G5iV0tRhrQilrIdnyHkibLbGM46u6_M-hqzNGnuAHCKGHvVYhzGz5Rv3kt3AyyQM2GdjEVn6DaEjsdSTA06So-oWJBqxKaD-Wd_8d4I7wxf9aCnEzxM5GipOF6VLzhx1FLjCKcCSjZhFvhbP-Lvft7gefIhDlG-TX95Scp1QfOMiwR85a-lX_xQH2UhZL6qDaRL4PZzxv5V_B6SeVbVLVZzWhBHcc",
  },
  {
    id: "support",
    icon: "support_agent",
    title: "Maintenance & Support",
    desc: "We stay with you long-term. Our ongoing partnership model ensures your systems remain performant, secure, and continuously improving.",
    supportItems: [
      { icon: "system_update", title: "System Updates",           desc: "Ensuring your tech stack remains modern and secure." },
      { icon: "monitoring",    title: "Performance Monitoring",   desc: "Uptime tracking and load optimisation 24/7." },
      { icon: "trending_up",   title: "Continuous Improvements",  desc: "Iterative updates based on user feedback and data." },
      { icon: "support_agent", title: "Priority Support",         desc: "Direct access to our engineering team for critical issues." },
    ],
    flip: false,
    special: "support",
  },
]

function ServiceSection({ service }) {
  const { icon, title, desc, tags, tagVariant, flip, img, graphic, bullets, features, badge, supportItems, special } = service

  if (special === "ai") {
    return (
      <section id={service.id} className="relative group scroll-mt-32">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--pce-cyan)] to-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
        <div className="relative bg-pce-surface-low rounded-2xl p-12 border border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <Badge variant="emerald" className="mb-4">{badge}</Badge>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tight">{title}</h2>
            </div>
            <span className="material-symbols-outlined text-[var(--pce-cyan)] text-6xl mt-6 md:mt-0" style={{ fontVariationSettings: "'FILL' 1" }}>
              {icon}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: fi, title: ft, desc: fd }) => (
              <div key={ft} className="p-6 bg-pce-surface-container rounded-xl border border-pce-outline-variant/10">
                <span className="material-symbols-outlined text-[var(--pce-cyan)] mb-4 block">{fi}</span>
                <h4 className="font-bold text-foreground mb-2">{ft}</h4>
                <p className="text-sm text-muted-foreground">{fd}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (special === "support") {
    return (
      <section id={service.id} className="bg-pce-surface-lowest rounded-3xl p-12 border border-pce-outline-variant/10 scroll-mt-32">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl font-headline font-bold text-foreground tracking-tight mb-2">{title}</h2>
            <Badge variant="default" className="mt-2">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              Ongoing Partnership
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {supportItems.map(({ icon: si, title: st, desc: sd }) => (
            <div key={st} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-pce-surface-container flex items-center justify-center mb-6 border border-pce-outline-variant/20">
                <span className="material-symbols-outlined text-primary text-3xl">{si}</span>
              </div>
              <h4 className="font-bold mb-2 text-foreground">{st}</h4>
              <p className="text-sm text-muted-foreground">{sd}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id={service.id} className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center scroll-mt-32`}>
      {/* Content */}
      <div className={flip ? "order-2" : "order-1 md:order-1"}>
        <div className="w-12 h-12 flex items-center justify-center bg-[var(--pce-cyan)]/10 rounded-lg mb-6">
          <span className="material-symbols-outlined text-[var(--pce-cyan)]">{icon}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-6 tracking-tight">{title}</h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{desc}</p>

        {bullets && (
          <div className="space-y-6">
            {bullets.map(({ icon: bi, title: bt, desc: bd }) => (
              <div key={bt} className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">{bi}</span>
                <div>
                  <h4 className="font-bold text-foreground">{bt}</h4>
                  <p className="text-muted-foreground text-sm">{bd}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Badge key={tag} variant={tagVariant}>{tag}</Badge>
            ))}
          </div>
        )}
      </div>

      {/* Visual */}
      <div className={`${flip ? "order-1" : "order-2"} bg-pce-surface-low rounded-xl p-4 border border-pce-outline-variant/10 card-glow`}>
        {img ? (
          <img src={img} alt={title} className="w-full rounded-lg opacity-80" />
        ) : graphic ? (
          <div className="relative overflow-hidden p-8">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-9xl text-foreground">{icon}</span>
            </div>
            <div className="space-y-4">
              <div className="h-2 w-32 bg-primary rounded" />
              <div className="h-2 w-48 bg-pce-surface-highest rounded" />
              <div className="h-40 w-full bg-pce-surface-lowest rounded-lg border border-pce-outline-variant/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-[var(--pce-cyan)]">{icon}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center">
            <span className="material-symbols-outlined text-8xl text-primary/20">{icon}</span>
          </div>
        )}
      </div>
    </section>
  )
}

export default function ServicesList() {
  return (
    <main className="max-w-7xl mx-auto px-8 py-24 space-y-40">
      {services.map((service) => (
        <ServiceSection key={service.id} service={service} />
      ))}

      {/* Services CTA */}
      <section className="relative">
        <div className="bg-pce-surface-container border border-primary/30 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">
              Not sure which service fits your needs?
            </h3>
            <p className="text-muted-foreground">
              Our consultants are ready to audit your current infrastructure and provide a custom roadmap.
            </p>
          </div>
          <a
            href="/contact"
            className="btn-primary shrink-0 inline-flex items-center gap-2 group"
          >
            Book a Free Consultation
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>
      </section>
    </main>
  )
}
