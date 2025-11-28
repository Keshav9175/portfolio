import React from "react";

// Import icons
import FigmaSVG from "../../assets/icons/Figma.svg";
import IllustratorSVG from "../../assets/icons/illustrator.svg";
import PhotoshopSVG from "../../assets/icons/photoshop.svg";
import NodeSVG from "../../assets/icons/node.svg";
import ReactSVG from "../../assets/icons/react.svg";
import TsSVG from "../../assets/icons/ts.svg";
import JsSVG from "../../assets/icons/js.svg";
import TailwindSVG from "../../assets/icons/tailwind.svg";
import NotionSVG from "../../assets/icons/notion.svg";
import WebflowSVG from "../../assets/icons/webflow.svg";

export default function SkillsAndAbout() {
  return (
    <div className="w-full bg-[#FAF4EC]">
      <div className="w-full flex flex-col items-center px-[50px] py-[80px]">

        {/* ABOUT HEADING */}
        <p className="text-[20px] uppercase text-black font-medium font-[TWKEverett]">
          About me
        </p>

        {/* MAIN TEXT — full width, 76px line-height */}
        <p
          className="
            w-full text-center mt-[60px]
            text-[48px] uppercase
            text-[rgba(0,0,0,0.6)]
            font-[TWKEverett]
          "
          style={{ lineHeight: "76px" }}
        >
          <span className="text-black font-extrabold font-[TWKEverett]">
            Keshav Divate is a passionate UI/
          </span>
          UX designer and developer who blends creativity with technology,
          crafting intuitive, engaging, and user-centered digital experiences
          through design and code.
        </p>

        {/* TECH ICONS */}
        <div
          className="
            mt-[60px]
            w-full flex flex-wrap gap-[40px]
            justify-center items-center
          "
        >
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
