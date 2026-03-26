import { Link } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  { value: "web",       label: "Website Dev" },
  { value: "systems",   label: "Systems Dev" },
  { value: "automation",label: "Automation" },
  { value: "ai",        label: "AI Integration" },
  { value: "analytics", label: "Data & Analytics" },
  { value: "support",   label: "Support" },
]

export default function ServicesHero({ activeTab, onTabChange }) {
  return (
    <>
      {/* Page header */}
      <header className="pt-32 pb-20 px-8 bg-pce-surface-lowest relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.1),_transparent_60%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 font-label">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-foreground">Services</span>
          </nav>
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-foreground mb-8">
            Our Services
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
            PCE Technologies helps businesses implement modern digital infrastructure —
            from custom websites to intelligent AI systems. We build the architecture of tomorrow.
          </p>
        </div>
      </header>

      {/* Sticky tab nav */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-y border-border/30 py-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-3 whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTabChange(tab.value)}
                className={`px-5 py-2 rounded-full text-sm font-bold font-label transition-all ${
                  activeTab === tab.value
                    ? "bg-primary text-primary-foreground shadow-glow-sm"
                    : "bg-pce-surface-high text-muted-foreground hover:bg-pce-surface-highest"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
