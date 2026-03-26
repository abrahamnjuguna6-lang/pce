const solutions = [
  {
    icon: "dashboard_customize",
    title: "Business Dashboards",
    desc: "Consolidate multiple data streams into a single, real-time source of truth for executive decision making.",
    color: "text-primary",
    glow: "bg-primary/10",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCeGZKDb6mSreY1LMx5xXeOuQ_ALHmuDvnMQbRPBdvFVibDJJMO49bh_zNcg1qQqhBIg1w5Yya2dhVvLkXCCEVjaDaOI4zXrCoSlmOrgAPTW0viOaxS__m4wcqjFZsVCxpCj20eVw3PEgNGoFJnPBpOPk9sg6hwhPFpRaIcbBmdr6XA0JvwbcN3lMhbixqdTaVLny2oHlVqiMwbuCFXg_s0xz1xwriJoLgKHHw-ohr-2IVS-ax6YNzj_zIhWUwT5FaBjMGPZWr5C0",
  },
  {
    icon: "account_tree",
    title: "Automated Workflows",
    desc: "End-to-end automation of back-office processes, reducing operational costs by up to 60%.",
    color: "text-[var(--pce-cyan)]",
    glow: "bg-[var(--pce-cyan)]/10",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeAJp1DlEphgDzRbhDZzig7n7OWkwKsCuNt1uqQiTlQVKz4eRY_a12QRJOzwNcxOAMxWQ9n13L0aikPgmf6NcP6pZw65jRDGYP73aC-Bl4n5KBtmEFiqi7e_se4siFXQ5_em7Ltm0CTvkLA68BEVnMlQ4TTHKaw6m61x3ycq2uqhkJIB8Vq6nnfLWNDppFQjRF31FtPr5dOMtva0Arz-t3fVZeLpBn92twWYcI0xWv5af3c2ovGgKMy9VjUfeRMT2HhttNrEqBL5g",
  },
  {
    icon: "support_agent",
    title: "AI Customer Support",
    desc: "Sophisticated AI agents that handle complex queries and escalate only high-priority tasks.",
    color: "text-[var(--pce-cyan)]",
    glow: "bg-[var(--pce-cyan)]/10",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCevS8MiMjlslsF5EOZ1--c7tdUd6YZacpFkmmbsaPFUGAqIfG9cjUlOi_IZWnwTpufStyfy9IoCJTL5aM0CNtDw6zGhyU95CyJauF8d-xDx1tABHw_8BAV0BWJhE0rsOFaggCiUwKyRxJy9a6X9SDsmrgSyiEjX83A-82mYjwRRL5RPg30SzVi8CpSeqH4ywsz0DVF9A8w7yJLv-WVcreU643W95tOLkUmkRZUsory6UQnBUKvj5m17neCjkRcLl7jR-yeJemgE54",
  },
  {
    icon: "language",
    title: "Web Platforms",
    desc: "Custom SaaS foundations and enterprise portals built with modern frameworks and robust security.",
    color: "text-primary",
    glow: "bg-primary/10",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoMiwtNYXDTT6AbVOmTctslCaFsqQayjHdRcJPKc0ZKWLn-BYKEbMT6npfweu6LOH-_h-KWhLARPV_wFI2Ny_m_0kCvsVghnf5cYDwpg9sE0_eoGbg703kd1bwf7FVd21nlbO3SmZREesW3WzyGlCEt95onSJCSx-f4U0dXjokiNQzz_FxlhLQ2Na3yNIz95rQ8Va2QYHMPOucY-mh4WsLz-kVAjAf60aRujIpzxAngmj4HU7cpFFcLYLWMWWuYcbn5KSrTsJLOsI",
  },
]

export default function FeaturedSolutions() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-headline font-bold tracking-tight mb-4 text-foreground">
              Solutions We Deliver
            </h2>
            <div className="w-12 h-1 bg-[var(--pce-cyan)]" />
          </div>
          <p className="text-muted-foreground max-w-md">
            Proprietary frameworks and custom builds that solve complex enterprise challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map(({ icon, title, desc, color, glow, img }) => (
            <div
              key={title}
              className="relative overflow-hidden p-10 group bg-gradient-to-br from-pce-surface-high to-background border border-pce-outline-variant/10 rounded-xl card-glow"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${glow} blur-[60px]`} />
              <span className={`material-symbols-outlined ${color} text-5xl mb-8 block`}>{icon}</span>
              <h3 className="text-2xl font-headline font-bold mb-4 text-foreground">{title}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">{desc}</p>
              <img
                src={img}
                alt={title}
                className="w-full rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
