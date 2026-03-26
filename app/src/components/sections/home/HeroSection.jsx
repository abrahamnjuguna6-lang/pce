import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-pce-surface-lowest">
      {/* Kinetic gradient */}
      <div className="absolute inset-0 kinetic-gradient pointer-events-none" />
      {/* Grid dot background */}
      <div className="absolute inset-0 opacity-10 grid-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Left — copy */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-center gap-3">
            <span className="data-pulse-dot" />
            <span className="text-[var(--pce-cyan)] font-label tracking-widest text-xs uppercase">
              Next-Gen Systems Engineering
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-headline font-bold tracking-tighter leading-[0.9] text-foreground">
            Intelligent Systems for{" "}
            <span className="text-primary">Modern Business.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            PCE Technologies helps businesses transition from manual operations to
            intelligent digital systems through AI, automation, and custom software.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg">
              <Link to="/contact">Start a Project</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Book Consultation</Link>
            </Button>
          </div>
        </div>

        {/* Right — graphic */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="absolute w-[120%] h-[120%] bg-primary/10 blur-[120px] rounded-full" />
          <img
            className="relative z-10 w-full max-w-md animate-float drop-shadow-[0_0_50px_rgba(0,210,253,0.2)]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUKeIZR2ZzdGJwzuRmI3DGvm9FryHVauaxHtcidPFAdNk39xDTINEBYMySQJL4J51SzwpXOaIfOZR5RJHvJJaD0I0EepuX4bGLrMdRjiItnIkUuuXRw-tgTcgdNtlopvFPrsn8heGLgSTPHXdVqBHIXcsYp7XPEcxDBJO0pJiVDfyBAhVl77BOvS0KhAX8bqGnTwxgcsp9pLk0IPeliAKxfSYDBHCPWSCxAejKBU25wCESCt8f-f1Qyniu-gg9xZZwSGY8km4fUEE"
            alt="Abstract circuit architecture"
          />
        </div>
      </div>
    </section>
  )
}
