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
      <FallingText
        text={`React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.`}
        highlightWords={["React", "Bits", "animated", "components", "simplify"]}
        highlightClass="highlighted"
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="2rem"
        mouseConstraintStiffness={0.9}
      />
      <Testimonial />
    </section>
  )
}
