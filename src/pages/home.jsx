import React from 'react'
import Hero from '../components/home-ui/hero'
import Services from '../components/home-ui/services'
import AboutSection from '../components/home-ui/about-section'
import ScrollablePosterGallery from '../components/home-ui/scrollable-poster-gallery'
import ProjectShowcase from '../components/home-ui/project-showcase'
import FallingText from '../components/home-ui/falling-text'
import Testimonial from '../components/home-ui/testimonial'
import HeroTwo from '../components/home-ui/hero-two'

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
