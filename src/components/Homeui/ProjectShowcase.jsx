import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectShowcase() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const ARROW_PATH = "M7 17L17 7M17 7H7M17 7V17";

  const cards = [
    { id: 1, bg: "white", numberColor: "#64625e", buttonVariant: "red", image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=1600&q=80" },
    { id: 2, bg: "#dfb5ff", numberColor: "#c881ff", buttonVariant: "white", image: "https://images.unsplash.com/photo-1523475496153-3d6cc0c9d5b5?w=1600&q=80" },
    { id: 3, bg: "#33c791", numberColor: "#6dffca", buttonVariant: "white", image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1600&q=80" },
    { id: 4, bg: "#0d8dff", numberColor: "#66b7ff", buttonVariant: "white", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1600&q=80" },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const spacer = 50;

      cards.forEach((card, index) => {
        // 1. PINNING LOGIC
        ScrollTrigger.create({
          trigger: card,
          start: `center-=${index * spacer} center`,
          endTrigger: containerRef.current,
          end: `bottom bottom`,
          pin: true,
          pinSpacing: false,
          id: `pin-${index}`,
          invalidateOnRefresh: true,
        });

        // 2. SCALING LOGIC
        const scaleValue = 0.85 + index * 0.05;
        gsap.to(card, {
          scale: scaleValue,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: `top center`,
            end: `bottom center`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // FIX APPLIED HERE:
    // 1. min-h-[300vh]: Gives length to scroll.
    // 2. pb-[800px]: This is the BUFFER. It pushes the footer down by the height of one card
    //    so it doesn't touch the stacked cards until you scroll past them completely.
    <div
      ref={containerRef}
      className="bg-[#faf4ec] relative min-h-[300vh] pb-[800px] w-full"
    >
      <div className="flex flex-col items-center w-full">
        <div className="box-border flex flex-col items-center px-[50px] pt-[80px] w-full">

          <p className="font-[TWKEverett] font-medium text-[20px] uppercase text-black mb-[60px]">
            wEB UI Project
          </p>

          {/* Cards */}
          {cards.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="stacking__card h-[680px] relative rounded-[40px] w-full overflow-hidden mb-[50px] origin-top"
              style={{
                backgroundColor: card.bg,
                zIndex: idx + 1,
                willChange: "transform"
              }}
            >
              <div className="box-border flex flex-col gap-[10px] h-[680px] items-start p-[40px] w-full">
                {/* Header */}
                <div className="flex items-center justify-between w-full">
                  <div className="bg-[#faf4ec] box-border flex gap-[10px] items-center justify-center p-[20px] rounded-[10px]">
                    <p className="font-[TWKEverett] font-medium text-[20px] uppercase text-black whitespace-nowrap">
                      Project
                    </p>
                  </div>

                  <p className="font-[TWKEverett] font-bold text-[80px] leading-none text-center whitespace-pre" style={{ color: card.numberColor }}>
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                </div>

                {/* Content */}
                <div className="flex gap-[60px] items-start w-full">
                  <div className="flex flex-col gap-[10px] items-start flex-1">
                    <p className="font-[TWKEverett] font-bold text-[120px] leading-[1.1] text-black whitespace-pre">
                      Snakiy
                    </p>
                    <div className="flex flex-col gap-[10px] items-start">
                      <p className="font-[TWKEverett] font-medium text-[32px] text-black whitespace-pre">
                        Keshav Divate is a p
                      </p>
                      <p className="font-[TWKEverett] font-medium text-[28px] text-black w-full max-w-[638px]">
                        <span className="text-[rgba(0,0,0,0.6)]">
                          Snakiy is a fast, interactive mini-game where players guide a growing snake through dynamic obstacles. Designed with smooth controls and clean UI, it offers quick.
                        </span>
                      </p>
                      <div className="mt-4 inline-flex items-center gap-[12px] px-[20px] py-[12px] rounded-[14px]" style={{ backgroundColor: card.buttonVariant === "red" ? "#ff4820" : "white" }}>
                        <p className="font-[TWKEverett] font-medium text-[20px] uppercase whitespace-nowrap" style={{ color: card.buttonVariant === "red" ? "white" : "black" }}>
                          vISIT nOW
                        </p>
                        <div className="box-border flex items-center p-[10px] rounded-[10px]" style={{ backgroundColor: card.buttonVariant === "red" ? "white" : "black" }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d={ARROW_PATH} stroke={card.buttonVariant === "red" ? "black" : "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex justify-center md:justify-end">
                    <div className="aspect-[1.3] relative rounded-[24px] w-full max-w-[720px] overflow-hidden">
                      <img src={card.image} alt={`project-${card.id}`} className="absolute inset-0 w-full h-full object-cover rounded-[24px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}