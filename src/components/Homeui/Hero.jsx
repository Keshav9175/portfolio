import React from "react";
import avatar from "../../assets/avatar.png";
import kbd from "../../assets/kbd.svg";     // name pill svg
import cloth from "../../assets/cloth.svg"; // blue pill svg
import think from "../../assets/think.svg"; // purple pill svg
import ImageTrail from "../../components/Animation/ImageTrail";

export default function Hero() {
  return (
    <section className="relative w-full h-[30vh] md:h-[87vh] bg-[#FAF4EC] overflow-hidden">
      <div className="absolute h-full w-full" style={{ overflow: 'hidden' }}>
        <ImageTrail
          items={[
            'https://picsum.photos/id/287/300/300',
            'https://picsum.photos/id/1001/300/300',
            'https://picsum.photos/id/1025/300/300',
            'https://picsum.photos/id/1026/300/300',
            'https://picsum.photos/id/1027/300/300',
            'https://picsum.photos/id/1028/300/300',
            'https://picsum.photos/id/1029/300/300',
            'https://picsum.photos/id/1030/300/300',
            // ...
          ]}
          variant={1}
        />
      </div>
      <div className="px-8 lg:px-6 2xl:px-[100px]">
        <div className="text-[11vw] lg:text-[180px] leading-[0.8] font-black text-[#2b2a29]">
          <div>CRAFTING</div>
          <div>DESIGN</div>
        </div>
      </div>

      {/* Right side small pill (cloth svg) */}
      <img
        src={cloth}
        alt="cloth-label"
        className="
          absolute 
          right-12
          2xl:right-[100px]
          top-[25%] md:top-[30%]
          w-[180px] md:w-auto
        "
      />

      {/* Left small pill (think svg) */}
      <img
        src={think}
        alt="think-label"
        className="
          absolute 
          left-8
          2xl:left-[100px]
          top-[54%] md:top-[52%]
          w-[100px] md:w-auto
        "
      />

      {/* Orange dot */}
      <div className="absolute right-1/3 2xl:right-[calc(100px+200px)] top-[36%] w-8 h-8 rounded-full bg-[#ff5733]" />

      {/* Second big headline */}
      <div
        className="
          absolute 
          right-6 
          2xl:right-[100px]
          bottom-6
          text-[#32312F] 
          text-[11vw] lg:text-[180px] 
          leading-[0.85] font-black text-[#2b2a29]
        "
      >
        <div>BUILDING</div>
        <div className="text-right">IDEAS</div>
      </div>

      {/* Bottom-center name pill (kbd svg) */}
      <img
        src={kbd}
        alt="kbd-pill"
        className="
          absolute 
          left-1/4 
          -translate-x-1/2 
          bottom-14
          w-[100px] md:w-auto
        "
      />

      {/* Bottom-left avatar */}
      <div
        className="
          absolute 
          left-8 
          2xl:left-[100px]
          bottom-8 
          flex items-center gap-3
        "
      >
        <div
          className="relative rounded-full bg-white w-20 h-20 flex items-center justify-center shadow-md"
          style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.12)" }}
        >
          <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
        </div>

        <div className="hidden md:flex flex-col text-xs text-[#2b2a29] tracking-wide">
          <span className="transform -rotate-90 -translate-y-6">UI / UX DESIGNER</span>
          <span className="transform -rotate-90 -translate-y-6 mt-1">WEB DEVELOPER</span>
        </div>
      </div>
    </section>
  );
}
