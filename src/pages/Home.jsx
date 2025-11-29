import React from 'react'
import Hero from '../components/Homeui/Hero'
import Services from '../components/Homeui/Services'
import AboutSection from '../components/Homeui/AboutSection'
import ScrollablePosterGallery from '../components/Homeui/ScrollablePosterGallery'
import ProjectShowcase from '../components/Homeui/ProjectShowcase'
import FallingText from '../components/Homeui/FallingText'
import Testimonial from '../components/Homeui/Testimonial'

export default function Home() {
  return (
    <section className="min-h-screen bg-[#FAF4EC] text-black">
      {/* render the Hero UI component */}
      <Hero />
      <Services />
      <AboutSection />
      <ScrollablePosterGallery />
      <ProjectShowcase />
      <div className="relative mt-[74px]">
        <FallingText />
      </div>
      <Testimonial />
    </section>
  )
}
