import React from "react";
import avatar from '../../assets/avatar.png'

export default function Hero() {
  return (
    <section className="relative w-full h-[84vh] bg-[#FAF4EC] overflow-hidden">
      {/* Large headline */}
      <div className="px-8 lg:px-6">
        <div className="text-[11vw] lg:text-[180px] leading-[0.8] font-black text-[#2b2a29]">
          <div>CRAFTING</div>
          <div>DESIGN</div>
        </div>
      </div>

      {/* Right side small pill (blue) */}
      <div
        className="absolute right-12 top-[28%] md:top-[30%] flex items-center px-6 py-2 rounded-full border-2 border-black"
        style={{
          background: "linear-gradient(0deg,#ffffff,#ffffff)", // white base
          boxShadow: "6px 6px 0px #00c2ff, -2px -2px 0px #000", // faux double outline
        }}
      >
        <span
          className="text-sm font-normal tracking-wide"
          style={{ textShadow: "0 3px 0 rgba(0,0,0,0.06)" }}
        >
          YOUR APP DESERVES BETTER CLOTHES.
        </span>
      </div>

      {/* Left small pill (purple) */}
      <div
        className="absolute left-8 top-[54%] md:top-[52%] flex items-center px-5 py-1.5 rounded-full border-2 border-black"
        style={{
          background: "linear-gradient(0deg,#fff,#fff)",
          boxShadow: "6px 6px 0px #b33cff, -2px -2px 0px #000",
        }}
      >
        <span className="text-sm font-normal" style={{ textShadow: "0 2px 0 rgba(0,0,0,0.06)" }}>
          THINK VISUALLY.
        </span>
      </div>

      {/* Orange dot */}
      <div className="absolute right-1/3 top-[36%] w-8 h-8 rounded-full bg-[#ff5733]" />

      {/* Second big headline (bottom-right) */}
      <div className="absolute right-6 bottom-6 text-[11vw] lg:text-[180px] leading-[0.85] font-black text-[#2b2a29]">
        <div>BUILDING</div>
        <div>IDEAS</div>
      </div>

      {/* Bottom-center name pill */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-14 px-6 py-2 rounded-full"
        style={{
          background: "linear-gradient(90deg,#fff,#fff)",
          boxShadow: "6px 6px 0px #ff2b2b, -2px -2px 0px #000",
        }}
      >
        <span className="text-base font-normal">KESHAV DIVATE</span>
      </div>

      {/* Bottom-left circular avatar with small text around */}
      <div className="absolute left-8 bottom-8 flex items-center gap-3">
        <div
          className="relative rounded-full bg-white w-20 h-20 flex items-center justify-center shadow-md"
          style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.12)" }}
        >
          <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
        </div>

        {/* circular rotated label (text around circle effect simplified as vertical text) */}
        <div className="hidden md:flex flex-col text-xs text-[#2b2a29] tracking-wide">
          <span className="transform -rotate-90 -translate-y-6">UI / UX DESIGNER</span>
          <span className="transform -rotate-90 -translate-y-6 mt-1">WEB DEVELOPER</span>
        </div>
      </div>
    </section>
  );
}
