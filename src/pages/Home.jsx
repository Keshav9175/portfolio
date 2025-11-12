import React from 'react'
import Hero from '../components/Homeui/Hero' 
import Services from '../components/Homeui/Services'

export default function Home() {
  return (
    <section className="min-h-screen bg-[#FAF4EC] text-black">
      {/* render the Hero UI component */}
      <Hero />
      <Services />
    </section>
  )
}
