const techCategories = [
  { icon: "code_blocks", label: "Web Frameworks" },
  { icon: "cloud_done",  label: "Cloud Platforms" },
  { icon: "robot",       label: "AI Integrations" },
  { icon: "sync_alt",    label: "Automation Tools" },
]

export default function TechStack() {
  return (
    <section className="py-24 bg-pce-surface-lowest">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h2 className="text-2xl font-headline font-bold mb-16 uppercase tracking-widest text-muted-foreground">
          Technologies We Work With
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
          {techCategories.map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-foreground">{icon}</span>
              <span className="text-xs font-bold font-label tracking-widest text-muted-foreground uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
