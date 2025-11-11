import React from 'react'

export default function Contact() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-bold text-cyan-400 mb-4">Contact</h1>
      <p className="text-gray-300 text-lg mb-4">
        Feel free to reach out if you’d like to collaborate or connect!
      </p>
      <a href="mailto:keshav@example.com" className="text-cyan-400 underline">
        keshav@example.com
      </a>
    </section>
  )
}
