import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#FFFFF] text-center py-6 mt-auto border-t border-gray-800">
      <div className="text-gray-400 text-sm">
        © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">Keshav Divate</span>. 
        All rights reserved.
      </div>
      <div className="mt-2 space-x-4">
        <a
          href="https://github.com/keshavdivate"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-cyan-400 transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/keshavdivate"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-cyan-400 transition"
        >
          LinkedIn
        </a>
        <a
          href="mailto:keshav@example.com"
          className="text-gray-500 hover:text-cyan-400 transition"
        >
          Email
        </a>
      </div>
    </footer>
  )
}
