import { useState } from "react"
import ServicesHero from "@/components/sections/services/ServicesHero"
import ServicesList from "@/components/sections/services/ServicesList"

export default function Services() {
  const [activeTab, setActiveTab] = useState("web")
  return (
    <>
      <ServicesHero activeTab={activeTab} onTabChange={setActiveTab} />
      <ServicesList />
    </>
  )
}
