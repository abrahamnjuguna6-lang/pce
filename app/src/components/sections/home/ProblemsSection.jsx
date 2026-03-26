const problems = [
  "Manual Workflows wasting human capital",
  "Lack of Automation creating scaling bottlenecks",
  "Poor Data Visibility leading to guesswork",
  "Inefficient Customer Support draining resources",
]

export default function ProblemsSection() {
  return (
    <section className="py-24 bg-pce-surface-lowest">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Problems list */}
        <div className="space-y-6">
          <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground">
            The Friction Points We Eliminate
          </h2>
          <div className="space-y-4">
            {problems.map((problem) => (
              <div
                key={problem}
                className="flex items-center gap-4 p-4 bg-pce-surface-low/50 border-l-4 border-destructive"
              >
                <span className="material-symbols-outlined text-destructive">warning</span>
                <span className="font-medium text-foreground">{problem}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Approach card */}
        <div className="relative space-y-8">
          <div className="p-10 bg-pce-surface-container rounded-xl border border-pce-outline-variant/20 shadow-2xl">
            <h3 className="text-2xl font-headline font-bold mb-4 text-foreground">Our Approach</h3>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              We don't just write code — we architect solutions. By identifying the specific
              technical debt and operational gaps holding you back, PCE Technologies implements
              robust automated systems that pay for themselves through increased efficiency and accuracy.
            </p>
            <button className="text-[var(--pce-cyan)] font-bold flex items-center gap-2 group hover:gap-3 transition-all">
              Explore our Methodology
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
