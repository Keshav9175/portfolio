import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="p-4 bg-gray-900 flex justify-between items-center">
      <h1 className="text-xl font-bold text-cyan-400">Keshav Divate</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-cyan-400">Home</Link>
        <Link to="/about" className="hover:text-cyan-400">About</Link>
        <Link to="/projects" className="hover:text-cyan-400">Projects</Link>
        <Link to="/contact" className="hover:text-cyan-400">Contact</Link>
      </nav>
    </header>
  )
}
