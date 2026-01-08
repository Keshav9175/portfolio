import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroTwo() {
    const maskMainRef = useRef(null);
    const splash1Ref = useRef(null);
    const splash2Ref = useRef(null);

    const mouse = useRef({ x: -200, y: -200 });
    const lag1 = useRef({ x: -200, y: -200 });
    const lag2 = useRef({ x: -200, y: -200 });

    /* ======================
       MOUSE TRACKING
    ====================== */
    useEffect(() => {
        const move = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    /* ======================
       GSAP LIQUID LOOP
    ====================== */
    useEffect(() => {
        const update = () => {
            const { x, y } = mouse.current;

            lag1.current.x += (x - lag1.current.x) * 0.1;
            lag1.current.y += (y - lag1.current.y) * 0.1;

            lag2.current.x += (x - lag2.current.x) * 0.07;
            lag2.current.y += (y - lag2.current.y) * 0.07;

            gsap.set(maskMainRef.current, {
                attr: { x: x - 225, y: y - 75 },
            });

            gsap.set(splash1Ref.current, {
                attr: { x: lag1.current.x - 30, y: lag1.current.y - 15 },
            });

            gsap.set(splash2Ref.current, {
                attr: { x: lag2.current.x - 100, y: lag2.current.y - 60 },
            });
        };

        gsap.ticker.add(update);
        return () => gsap.ticker.remove(update);
    }, []);

    return (
        <section className="bg-[#FAF4EC] relative w-full h-[87vh] overflow-hidden cursor-none flex items-center justify-center">
            {/* FRONT SVG */}
            <img
                src="https://firebasestorage.googleapis.com/v0/b/portfolio-keshav-93f5b.firebasestorage.app/o/project-images%2FOther%20Images%2FTop%20(1).svg?alt=media&token=670c288c-3858-4797-ac75-c19af9d6ac5b"
                alt="Front"
                className="absolute inset-0 w-full h-full object-cover lg:object-contain block scale-[1.02] z-[1]"
            />

            {/* BACK SVG (LIQUID REVEAL) */}
            <img
                src="https://firebasestorage.googleapis.com/v0/b/portfolio-keshav-93f5b.firebasestorage.app/o/project-images%2FOther%20Images%2FBottom.svg?alt=media&token=a98b8014-f693-40ee-8d5b-55b6ce3e5df8"
                alt="Back"
                className="absolute inset-0 w-full h-full object-cover lg:object-contain block scale-[1.02] z-[2]
           [mask:url(#ink-mask)] [-webkit-mask:url(#ink-mask)]
           [filter:url(#image-liquid-filter)]"
            />

            {/* SVG ENGINE */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="liquid-ink-filter" x="-60%" y="-60%" width="220%" height="220%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="4" seed="1">
                            <animate attributeName="baseFrequency" values="0.022;0.03;0.022" dur="6s" repeatCount="indefinite" />
                        </feTurbulence>

                        <feDisplacementMap in="SourceGraphic" scale="110">
                            <animate attributeName="scale" values="90;130;90" dur="5s" repeatCount="indefinite" />
                        </feDisplacementMap>

                        <feGaussianBlur stdDeviation="4.5" />
                        <feColorMatrix
                            type="matrix"
                            values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -9"
                        />
                    </filter>

                    <filter id="image-liquid-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="8" result="noise">
                            <animate attributeName="baseFrequency" values="0.013;0.018;0.013" dur="6s" repeatCount="indefinite" />
                        </feTurbulence>

                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale="22"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        >
                            <animate attributeName="scale" values="18;28;18" dur="5s" repeatCount="indefinite" />
                        </feDisplacementMap>
                    </filter>

                    <mask id="ink-mask">
                        <g filter="url(#liquid-ink-filter)">
                            <rect ref={maskMainRef} width="450" height="150" rx="40" ry="40" fill="white" />
                            <rect ref={splash1Ref} width="140" height="80" rx="30" ry="30" fill="white" />
                            <rect ref={splash2Ref} width="120" height="70" rx="28" ry="28" fill="white" />
                        </g>
                    </mask>
                </defs>
            </svg>

            {/* ================= ROTATING BADGE (BOTTOM LEFT) ================= */}
            <div className="absolute bottom-[28px] left-[28px] z-[30] pointer-events-none">
                <div className="relative w-[140px] h-[140px] flex items-center justify-center">

                    {/* Rotating Circular Text */}
                    <svg
                        viewBox="0 0 300 300"
                        className="absolute inset-0 w-full h-full rotating-text"
                    >
                        <defs>
                            <path
                                id="circlePath"
                                d="
                      M 150,150
                      m -120,0
                      a 120,120 0 1,1 240,0
                      a 120,120 0 1,1 -240,0
                    "
                            />
                        </defs>

                        <text
                            fill="#000"
                            fontSize="24"
                            letterSpacing="3"
                            fontWeight="600"
                            textTransform="uppercase"
                        >
                            <textPath href="#circlePath">
                                ✦ UI ✦ UX ✦ DESIGN ✦ CREATIVE ✦ WEB DEVELOPMENT
                            </textPath>
                        </text>
                    </svg>

                    {/* Center PNG */}
                    <img
                        src="/avatar.png"
                        alt="badge"
                        className="w-[64px] h-[64px] object-contain z-[2]"
                    />
                </div>
            </div>

            <style>{`
@keyframes rotateBadge {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotating-text {
  animation: rotateBadge 14s linear infinite;
}
`}</style>

        </section>
    );
}
