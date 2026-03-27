import { useState, useEffect, useCallback } from "react"
import ServicesHero from "@/components/sections/services/ServicesHero"
import ServicesList from "@/components/sections/services/ServicesList"

const SECTION_IDS = ["web", "systems", "automation", "ai", "analytics", "support"]
// Must match the sticky header + tab nav combined height (navbar h-16 = 64px, tab nav ≈ 57px)
const SCROLL_OFFSET = 128 // matches scroll-mt-32 on sections

export default function Services() {
  const [activeTab, setActiveTab] = useState("web")

  // ── Scroll spy ──────────────────────────────────────────────────────────────
  // Each section is "active" when it occupies the 30–40% band of the viewport.
  // This creates a single-section trigger zone just above the visual centre,
  // so the active tab updates smoothly as the user scrolls through the page.
  useEffect(() => {
    const observers = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveTab(id)
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      )

      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // ── Click handler ───────────────────────────────────────────────────────────
  const handleTabChange = useCallback((id) => {
    setActiveTab(id)
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
  }, [])

  return (
    <>
      <ServicesHero activeTab={activeTab} onTabChange={handleTabChange} />
      <ServicesList />
    </>
  )
}
