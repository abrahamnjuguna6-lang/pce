import { useState, useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home",      to: "/" },
  { label: "Services",  to: "/services" },
  { label: "Solutions", to: "/solutions" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "About",     to: "/about" },
  { label: "Contact",   to: "/contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "glass-nav shadow-2xl shadow-primary/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-headline font-bold text-xl tracking-tighter text-primary">
          PCE Technologies
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "font-label text-sm transition-colors",
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <Button asChild size="default" className="hidden md:inline-flex">
          <Link to="/contact">Start a Project</Link>
        </Button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-nav border-t border-border px-8 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "font-label text-sm py-2 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Button asChild size="default" className="w-full mt-2">
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Start a Project
            </Link>
          </Button>
        </div>
      )}
    </nav>
  )
}
