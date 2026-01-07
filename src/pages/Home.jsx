import React from 'react'
import Hero from '../components/Homeui/Hero'
import Services from '../components/Homeui/Services'
import AboutSection from '../components/Homeui/AboutSection'
import ScrollablePosterGallery from '../components/Homeui/ScrollablePosterGallery'
import ProjectShowcase from '../components/Homeui/ProjectShowcase'
import FallingText from '../components/Homeui/FallingText'
import Testimonial from '../components/Homeui/Testimonial'
import HeroTwo from '../components/Homeui/HeroTwo'

export default function Home() {
  return (
    <section className="min-h-screen bg-[#FAF4EC] text-black">
      {/* render the Hero UI component */}
      {/* <Hero /> */}
      <HeroTwo />
      <Services />
      <AboutSection />
      <ScrollablePosterGallery />
      <ProjectShowcase />
      <div className="relative mt-[90px]">
        <FallingText />
      </div>
      <Testimonial />
    </section>
  )
}
