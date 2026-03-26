import HeroSection       from "@/components/sections/home/HeroSection"
import WhatWeDoStrip     from "@/components/sections/home/WhatWeDoStrip"
import ServicesGrid      from "@/components/sections/home/ServicesGrid"
import ProblemsSection   from "@/components/sections/home/ProblemsSection"
import FeaturedSolutions from "@/components/sections/home/FeaturedSolutions"
import TechStack         from "@/components/sections/home/TechStack"
import ProcessSection    from "@/components/sections/home/ProcessSection"
import CTABanner         from "@/components/common/CTABanner"

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhatWeDoStrip />
      <ServicesGrid />
      <ProblemsSection />
      <FeaturedSolutions />
      <TechStack />
      <ProcessSection />
      <CTABanner />
    </>
  )
}
