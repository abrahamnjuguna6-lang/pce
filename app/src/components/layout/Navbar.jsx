import { useState, useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { navbarReveal } from "@/lib/animations"

const navLinks = [
  { label: "Home",      to: "/" },
  { label: "Services",  to: "/services" },
  { label: "Solutions", to: "/solutions" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "About",     to: "/about" },
  { label: "Contact",   to: "/contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav
      variants={navbarReveal}
      initial="hidden"
      animate="visible"
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "glass-nav shadow-2xl shadow-primary/5"
          : "bg-[rgba(17,19,24,0.55)] backdrop-blur-md border-b border-white/5"
      )}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/" className="font-headline font-bold text-xl tracking-tighter text-primary">
            PCE Technologies
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <motion.div
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease: "easeOut" }}
            >
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "font-label text-sm transition-colors relative group",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {/* animated underline */}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block"
        >
          <Button asChild size="default">
            <Link to="/contact">Start a Project</Link>
          </Button>
        </motion.div>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            key={menuOpen ? "close" : "menu"}
            className="material-symbols-outlined"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0,   opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {menuOpen ? "close" : "menu"}
          </motion.span>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden glass-nav border-t border-border"
          >
            <div className="px-8 py-4 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "font-label text-sm py-2 block transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <Button asChild size="default" className="w-full mt-2">
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  Start a Project
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
