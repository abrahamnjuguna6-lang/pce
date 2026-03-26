import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"

const serviceLinks = [
  "Website Development",
  "Business Systems",
  "Automation",
  "AI Integration",
  "Data & Analytics",
  "Support",
]

const navLinks = [
  { label: "Home",      to: "/" },
  { label: "Services",  to: "/services" },
  { label: "Solutions", to: "/solutions" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "About",     to: "/about" },
  { label: "Contact",   to: "/contact" },
]

export default function Footer() {
  return (
    <footer className="bg-pce-surface-lowest border-t-2 border-[var(--pce-cyan)]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="font-headline font-bold text-xl text-primary">
              PCE Technologies
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Helping businesses transition from manual operations to intelligent digital
              systems through AI, automation, and custom software.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-[var(--pce-cyan)] transition-colors text-sm">LinkedIn</a>
              <a href="#" className="text-muted-foreground hover:text-[var(--pce-cyan)] transition-colors text-sm">GitHub</a>
              <a href="#" className="text-muted-foreground hover:text-[var(--pce-cyan)] transition-colors text-sm">Twitter</a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-label font-bold text-foreground text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-label font-bold text-foreground text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PCE Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
