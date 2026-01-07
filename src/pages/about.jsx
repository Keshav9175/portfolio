import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import AboutPage from '../components/about-ui/about-page'
import Clients from "../components/clients";
import AboutHero from "../components/about-ui/about-hero";
import Testimonial from "../components/home-ui/testimonial";

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
