// src/components/AboutSection.jsx
import React from "react";

import FigmaIcon from "../../assets/icons/Figma.svg";
import AiIcon from "../../assets/icons/illustrator.svg";
import PsIcon from "../../assets/icons/photoshop.svg";
import NodeIcon from "../../assets/icons/node.svg";
import ReactIcon from "../../assets/icons/react.svg";
import TSIcon from "../../assets/icons/ts.svg";
import JSIcon from "../../assets/icons/js.svg";
import TailwindIcon from "../../assets/icons/tailwind.svg";
import NotionIcon from "../../assets/icons/notion.svg";
import WebflowIcon from "../../assets/icons/webflow.svg";

export default function AboutSection() {
  const logos = [
    { src: FigmaIcon, alt: "Figma" },
    { src: AiIcon, alt: "Adobe Illustrator" },
    { src: PsIcon, alt: "Adobe Photoshop" },
    { src: NodeIcon, alt: "Node.js" },
    { src: ReactIcon, alt: "React" },
    { src: TSIcon, alt: "TypeScript" },
    { src: JSIcon, alt: "JavaScript" },
    { src: TailwindIcon, alt: "Tailwind CSS" },
    { src: NotionIcon, alt: "Notion" },
    { src: WebflowIcon, alt: "Webflow" },
  ];

  return (
    <section className="w-full bg-[#FBF6F1] py-12 md:py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-24 text-center">
        {/* Small label */}
        <div className="mb-6">
          <span className="text-sm md:text-base tracking-wide font-medium text-black/90">ABOUT ME</span>
        </div>

        {/* Big headline */}
        <div className="mx-auto max-w-[1200px]">
        <p
            className="
            font-extrabold text-black 
            tracking-tight text-center
            "
            style={{
            fontSize: "48px",
            lineHeight: "76px",
            }}
        >
            KESHAV DIVATE IS A PASSIONATE UI/UX DESIGNER AND DEVELOPER WHO BLENDS
            CREATIVITY WITH TECHNOLOGY, CRAFTING INTUITIVE, ENGAGING, AND
            USER-CENTERED DIGITAL EXPERIENCES THROUGH DESIGN AND CODE.
        </p>
        </div>


        {/* Logos row */}
        <div className="mt-10 md:mt-12">
          <div
            className="
              flex items-center justify-center gap-6 md:gap-8 flex-wrap
              px-4 md:px-12 lg:px-24
            "
          >
            {logos.map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center"
                aria-hidden={false}
              >
                {/* SVGs scale responsively; adjust w/h for breakpoints */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                  style={{ objectFit: "contain", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
