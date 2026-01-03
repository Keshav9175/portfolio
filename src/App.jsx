import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Import all pages
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Project'
import Connect from './pages/Connect'
import SingleProject from './components/Projects/SingleProject'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/single-project/:id" element={<SingleProject />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
