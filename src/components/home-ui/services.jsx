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
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const items = track.children;

    // Set initial position for reverse rows to avoid jump on start
    if (direction < 0) {
      gsap.set(track, { xPercent: -50 });
    }

    // Main animation: Move exactly 50% (the length of one full set of text)
    const loop = gsap.to(track, {
      xPercent: direction > 0 ? -50 : 0,
      ease: "none",
      duration: 20,
      repeat: -1,
      startAt: direction > 0 ? { xPercent: 0 } : { xPercent: -50 }
    });

    // quickTo creates a smoothed transition for the speed boost
    // This prevents the "jerky" speed changes when starting/stopping scrolling
    const setTimeScale = gsap.quickTo(loop, "timeScale", {
      duration: 0.5,
      ease: "power2.out"
    });

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        // Map scroll velocity to a speed multiplier (1 = normal, 3 = fast)
        const boost = gsap.utils.clamp(0, 2.5, velocity / 800);
        setTimeScale(1 + boost);
      }
    });

    return () => {
      loop.kill();
      trigger.kill();
    };
  }, [direction]);

  return (
    <div className="flex overflow-hidden whitespace-nowrap border-y border-transparent">
      <div
        ref={trackRef}
        className="flex items-center flex-nowrap will-change-transform"
      >
        {/* We render twice for the seamless loop */}
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