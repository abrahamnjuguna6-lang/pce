const highlights = [
  { icon: "verified",   label: "6 Core Services" },
  { icon: "smart_toy",  label: "AI-Powered Solutions" },
  { icon: "speed",      label: "End-to-End Delivery" },
]

export default function WhatWeDoStrip() {
  return (
    <section className="py-24 bg-pce-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-center text-center space-y-12">
          <p className="max-w-2xl text-xl font-medium text-muted-foreground leading-relaxed">
            We are a specialised engineering firm dedicated to building the high-performance
            digital backbone that powers today's leading enterprises.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {highlights.map(({ icon, label }) => (
              <div
                key={label}
                className="bg-pce-surface-low px-6 py-3 rounded-full border border-pce-outline-variant/20 flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-[var(--pce-cyan)] text-xl">{icon}</span>
                <span className="font-label font-semibold text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Glow divider */}
        <div className="mt-20 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--pce-cyan)]/30 to-transparent" />
      </div>
    </section>
  )
}
