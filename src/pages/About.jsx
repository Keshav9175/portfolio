import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AboutPage from '../components/AboutPage'
import Clients from "../components/Clients";
import Testimonial from "../components/Homeui/Testimonial";

export default function About() {
  return (
    <>
      <AboutPage />
      <Clients />
      <Testimonial />
    </>
  )
}
