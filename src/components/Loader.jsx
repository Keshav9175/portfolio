import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
    const container = useRef(null);
    const topStrip = useRef(null);
    const bottomStrip = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            delay: 1.8,
            defaults: { ease: "power4.inOut" },
        });

        // Move strips out together
        tl.to(topStrip.current, {
            xPercent: -130,
            yPercent: -130,
            duration: 1.2,
        })
            .to(
                bottomStrip.current,
                {
                    xPercent: 130,
                    yPercent: 130,
                    duration: 1.2,
                },
                "<" // same start time
            )

            // Keep loader for 1 frame, then fade it out
            .to(container.current, {
                autoAlpha: 0,
                duration: 0.01, // 👈 one-frame fade
            })

            // NOW tell React to unmount
            .add(() => {
                onComplete?.();
            });

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div
            ref={container}
            className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
        >
            {/* TOP STRIP */}
            <div
                ref={topStrip}
                className="absolute left-[-25%] top-[42%] w-[150%]
             bg-[#FE7524] rotate-[-8deg]
             flex items-center py-[20px]"
            >
                <Marquee />
            </div>

            {/* BOTTOM STRIP */}
            <div
                ref={bottomStrip}
                className="absolute left-[-25%] top-[54%] w-[150%]
             bg-[#FE7524] rotate-[8deg]
             flex items-center py-[20px]"
            >
                <Marquee reverse />
            </div>
        </div>
    );
}

function Marquee({ reverse }) {
    return (
        <div
            className={`flex gap-14 whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"
                }`}
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-14">
                    <span className="text-black italic font-extrabold uppercase text-[44px] md:text-[44px] leading-tight">
                        LOADING
                    </span>

                    <svg className="w-10 h-10 fill-white" viewBox="0 0 24 24">
                        <path d="M5 4l7 8-7 8h4l7-8-7-8z" />
                    </svg>
                </div>
            ))}
        </div>
    );
}
