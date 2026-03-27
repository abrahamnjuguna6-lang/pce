import HeroSection       from "@/components/sections/home/HeroSection"
import WhatWeDoStrip     from "@/components/sections/home/WhatWeDoStrip"
import ServiceNodes      from "@/components/sections/home/ServiceNodes"
import ServicesGrid      from "@/components/sections/home/ServicesGrid"
import ScrollingStory    from "@/components/sections/home/ScrollingStory"
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
      <ServiceNodes />
      <ServicesGrid />
      <ScrollingStory />
      <ProblemsSection />
      <FeaturedSolutions />
      <TechStack />
      <ProcessSection />
      <CTABanner />
    </>
  )
}
