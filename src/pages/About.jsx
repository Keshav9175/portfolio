import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AboutPage from '../components/AboutUI/AboutPage'
import Clients from "../components/Clients";
import AboutHero from "../components/AboutUI/AboutHero";
import Testimonial from "../components/Homeui/Testimonial";

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutPage />
      <Clients />
      <Testimonial />
    </>
  )
}
