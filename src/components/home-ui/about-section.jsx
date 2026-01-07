import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

// Import icons
// Import icons
import FigmaSVG from "../../assets/icons/figma.svg";
import IllustratorSVG from "../../assets/icons/illustrator.svg";
import PhotoshopSVG from "../../assets/icons/photoshop.svg";
import NodeSVG from "../../assets/icons/node.svg";
import ReactSVG from "../../assets/icons/react.svg";
import TsSVG from "../../assets/icons/ts.svg";
import JsSVG from "../../assets/icons/js.svg";
import TailwindSVG from "../../assets/icons/tailwind.svg";
import NotionSVG from "../../assets/icons/notion.svg";
import WebflowSVG from "../../assets/icons/webflow.svg";

// 1. Single variable for all text
const text = "Keshav Divate is a passionate UI/ UX designer and developer who blends creativity with technology, crafting intuitive, engaging, and user-centered digital experiences through design and code.";

export default function SkillsAndAbout() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");
  const totalWords = words.length;

  return (
    <div className="w-full bg-[#FAF4EC]">
      <div className="w-full flex flex-col items-center px-[50px] py-[80px]">

        {/* ABOUT HEADING */}
        <p className="text-[20px] uppercase text-black font-medium font-[TWKEverett]">
          About me
        </p>

        {/* MAIN TEXT */}
        <p
          ref={container}
          className="
            w-full text-center mt-[60px]
            text-[48px] uppercase leading-[1.4]
            font-[TWKEverett] flex flex-wrap justify-center
          "
        >
          {words.map((word, i) => {
            const start = i / totalWords;
            const end = start + 1 / totalWords;

            // Logic: If word is 'UI/', remove the right margin so it touches 'UX'
            const isUI = word === "UI/";

            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                hasNoMargin={isUI}
              >
                {word}
              </Word>
            );
          })}
        </p>

        {/* ICONS */}
        <div className="mt-[60px] w-full flex flex-wrap gap-[40px] justify-center items-center">
          <img src={FigmaSVG} alt="Figma" className="w-[60px] h-[80px]" />
          <img src={IllustratorSVG} alt="Illustrator" className="w-[80px] h-[80px]" />
          <img src={PhotoshopSVG} alt="Photoshop" className="w-[80px] h-[80px]" />
          <img src={NodeSVG} alt="NodeJS" className="w-[80px] h-[80px]" />
          <img src={ReactSVG} alt="React" className="w-[80px] h-[80px]" />
          <img src={TsSVG} alt="TypeScript" className="w-[80px] h-[80px]" />
          <img src={JsSVG} alt="JavaScript" className="w-[80px] h-[80px]" />
          <img src={TailwindSVG} alt="Tailwind" className="w-[100px] h-[60px]" />
          <img src={NotionSVG} alt="Notion" className="w-[80px] h-[80px]" />
          <img src={WebflowSVG} alt="Webflow" className="w-[80px] h-[80px]" />
        </div>
      </div>
    </div>
  );
}

const Word = ({ children, progress, range, hasNoMargin }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`
        relative inline-block
        font-extrabold text-black 
        ${hasNoMargin ? "mr-0" : "mr-[0.25em]"}
      `}
    >
      {/* Change 'font-extrabold' above to 'font-bold' or 'font-black' 
         if you need to fine-tune the weight further.
      */}
      {children}
    </motion.span>
  );
};