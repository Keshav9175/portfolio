import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const flowerSvg = (
  <svg width="48" height="48" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-12 shrink-0">
    <path d="M26 0C26 14.3594 14.3594 26 0 26C14.3594 26 26 37.6406 26 52C26 37.6406 37.6406 26 52 26C37.6406 26 26 14.3594 26 0Z" fill="white" />
  </svg>
);

const MarqueeRow = ({ texts, direction = 1 }) => {
  const rowRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const items = track.children;

    // 1. Create the infinite loop
    // We animate the track from 0 to -50% (since we duplicated the content)
    const totalWidth = track.offsetWidth / 2;

    const loop = gsap.to(track, {
      x: direction > 0 ? -totalWidth : 0,
      duration: 20, // Base speed (higher is slower)
      ease: "none",
      repeat: -1,
      // Start at the correct position if moving right
      startAt: direction > 0 ? { x: 0 } : { x: -totalWidth }
    });

    // 2. Velocity logic
    // We create a ScrollTrigger that listens to the global scroll velocity
    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity() / 1000); // Normalize velocity
        const targetTimeScale = 1 + velocity; // Base speed + scroll speed

        // Smoothly transition the animation speed
        gsap.to(loop, {
          timeScale: targetTimeScale,
          duration: 0.5,
          overwrite: true
        });
      }
    });

    return () => {
      loop.kill();
    };
  }, [direction]);

  return (
    <div ref={rowRef} className="flex overflow-hidden whitespace-nowrap border-y border-transparent">
      <div ref={trackRef} className="flex items-center flex-nowrap">
        {/* We render the row twice so it loops seamlessly */}
        {[1, 2].map((group) => (
          <div key={group} className="flex items-center flex-nowrap">
            {texts.map((text, i) => (
              <React.Fragment key={i}>
                <span className="text-[60px] md:text-[80px] font-extrabold italic uppercase leading-tight text-[#000]">
                  {text}
                </span>
                {flowerSvg}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  const rows = [
    ["UI UX DESIGN", "WEB DEVELOPMENT"],
    ["LOGO DESIGN", "VIDEO EDITING"],
    ["VIDEO EDITING", "LOGO DESIGN"],
    ["MOTION GRAPHICS", "ARTIFICIAL INTELLIGENCE"],
  ];

  return (
    <section
      className="relative overflow-hidden flex flex-col justify-center bg-[#7A25F9] py-20 min-h-[732px]"
    >
      <div className="flex flex-col gap-10 md:gap-[60px]">
        {rows.map((row, index) => (
          <MarqueeRow
            key={index}
            texts={row}
            direction={index % 2 === 0 ? 1 : -1}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;