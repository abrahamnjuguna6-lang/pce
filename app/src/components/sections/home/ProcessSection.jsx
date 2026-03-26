const steps = [
  { number: "1", title: "Consultation",   desc: "Deep dive into your operations and pain points." },
  { number: "2", title: "System Design",  desc: "Architecting the blueprint for your digital ecosystem." },
  { number: "3", title: "Development",    desc: "Rapid builds using clean, scalable codebases." },
  { number: "4", title: "Integration",    desc: "Deploying and syncing with existing platforms." },
  { number: "5", title: "Support",        desc: "Ongoing optimisation and maintenance." },
]

export default function ProcessSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground">
            Our Process
          </h2>
          <p className="text-muted-foreground mt-4">
            A proven journey from initial concept to lifecycle support.
          </p>
        </div>

        <div className="relative">
          {/* Connecting gradient line (desktop) */}
          <div className="absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-[var(--pce-cyan)] to-pce-surface-container hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map(({ number, title, desc }) => (
              <div key={number} className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow-blue">
                  {number}
                </div>
                <div>
                  <h3 className="text-xl font-headline font-bold mb-2 text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
