// src/components/Projects/ProjectSection.jsx
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ImageWithFallback from "../ImageWithFallback";

export default function ProjectSection() {
    const projects = [
        {
            date: "Mai 2024",
            title: "Makhna E-Commerce Website",
            tags: [{ label: "Website" }, { label: "Website" }, { label: "Website" }],
            imageUrl:
                "https://images.unsplash.com/photo-1739459365519-9d3978d884aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwd2Vic2l0ZSUyMG1vY2t1cHxlbnwxfHx8fDE3NjQzMjEwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
            fontFamily: "TWKEverett:Bold",
        },
        {
            date: "Mai 2024",
            title: "Makhna E-Commerce Website",
            tags: [{ label: "Website" }, { label: "Website" }, { label: "Website" }],
            imageUrl:
                "https://images.unsplash.com/photo-1677469684112-5dfb3aa4d3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2NDMxNzQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
            fontFamily: "TWKEverett:Bold",
        },
        {
            date: "Mai 2024",
            title: "Makhna E-Commerce Website",
            tags: [
                { label: "Website" },
                { label: "Website", variant: "light" },
                { label: "Website", variant: "light" },
            ],
            imageUrl:
                "https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBwb3J0Zm9saW98ZW58MXx8fHwxNzY0MjM1NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
            fontFamily: "Poppins:600",
        },
        {
            date: "Juin 2024",
            title: "Another Project",
            tags: [{ label: "App" }],
            imageUrl: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1080&q=80",
            fontFamily: "Poppins:600",
        },
        {
            date: "Juin 2024",
            title: "Yet Another",
            tags: [{ label: "Branding" }],
            imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1080&q=80",
            fontFamily: "Poppins:600",
        },
    ];

    // parse "Family:Weight" -> { family, weight }
    const parseFontString = (fontString) => {
        if (!fontString || typeof fontString !== "string") return { family: undefined, weight: undefined };
        const [familyPart, weightPart] = fontString.split(":");
        const weightMap = { Thin: 100, ExtraLight: 200, Light: 300, Regular: 400, Medium: 500, SemiBold: 600, Bold: 700, ExtraBold: 800, Black: 900 };
        const weight = weightPart ? (isNaN(Number(weightPart)) ? weightMap[weightPart] || undefined : Number(weightPart)) : undefined;
        return { family: familyPart, weight };
    };

    const rowRef = useRef(null);
    const sectionRef = useRef(null);
    const touchStartRef = useRef(null);
    const proxyRef = useRef({ x: 0 });
    const quickToRef = useRef(null);
    const autoScrolledRef = useRef(false); // ensure auto-vertical-scroll runs once

    const [isSectionActive, setIsSectionActive] = useState(false);
    const [isAtHorizontalEnd, setIsAtHorizontalEnd] = useState(false);

    // tuning
    const MULTIPLIER = 8.5; // wheel/touch multiplier (higher = faster)
    const QUICKTO_DURATION = 0.14; // quickTo duration
    const QUICKTO_EASE = "power4.out";
    const END_THRESHOLD = 6; // threshold px from right end to consider finished

    // setup gsap.quickTo once
    useEffect(() => {
        quickToRef.current = gsap.quickTo(proxyRef.current, "x", {
            duration: QUICKTO_DURATION,
            ease: QUICKTO_EASE,
            onUpdate: () => {
                const el = rowRef.current;
                if (el) el.scrollLeft = proxyRef.current.x;
            },
        });
        return () => {
            quickToRef.current = null;
            gsap.killTweensOf(proxyRef.current);
        };
    }, []);

    // IntersectionObserver to set section active when centered roughly
    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsSectionActive(entry.isIntersecting && entry.intersectionRatio > 0.35);
                });
            },
            { threshold: [0, 0.15, 0.35, 0.6] }
        );
        io.observe(node);
        return () => io.disconnect();
    }, []);

    // monitor horizontal scroll to set finished state
    useEffect(() => {
        const el = rowRef.current;
        if (!el) return;
        const onScroll = () => {
            const max = el.scrollWidth - el.clientWidth;
            const nearEnd = el.scrollLeft >= Math.max(0, max - END_THRESHOLD);
            const atLeft = el.scrollLeft <= END_THRESHOLD;
            setIsAtHorizontalEnd(nearEnd);
            if (atLeft && isAtHorizontalEnd) setIsAtHorizontalEnd(false);
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => el.removeEventListener("scroll", onScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // lock both documentElement (html) and body while section active & not finished
    useEffect(() => {
        const shouldLock = isSectionActive && !isAtHorizontalEnd;

        // save previous values for exact restore
        const prevBodyOverflow = document.body.style.overflow;
        const prevHtmlOverflow = document.documentElement.style.overflow;

        if (shouldLock) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = prevBodyOverflow || "";
            document.documentElement.style.overflow = prevHtmlOverflow || "";
        }

        return () => {
            document.body.style.overflow = prevBodyOverflow || "";
            document.documentElement.style.overflow = prevHtmlOverflow || "";
        };
    }, [isSectionActive, isAtHorizontalEnd]);

    // auto-vertical-scroll ONCE when horizontal finishes: scroll to section bottom so next content aligns top
    useEffect(() => {
        if (!isAtHorizontalEnd) return;
        if (autoScrolledRef.current) return;

        // restore body & html overflow to enable scrolling
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";

        // small delay for layout stability, then smooth scroll to section bottom
        setTimeout(() => {
            const sec = sectionRef.current;
            if (!sec) return;
            const target = sec.offsetTop + sec.offsetHeight;
            window.scrollTo({ top: target, behavior: "smooth" });
            autoScrolledRef.current = true;
        }, 80);
    }, [isAtHorizontalEnd]);

    // clamp helper
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    // smooth scroll using quickTo proxy
    const smoothScrollTo = (el, targetX) => {
        if (!el || !quickToRef.current) {
            if (el) el.scrollLeft = targetX;
            return;
        }
        const max = el.scrollWidth - el.clientWidth;
        const final = clamp(targetX, 0, max);
        proxyRef.current.x = el.scrollLeft;
        quickToRef.current(final);
    };

    // wheel handler (handles both directions)
    const handleWheel = (e) => {
        if (!isSectionActive) return;
        const el = rowRef.current;
        if (!el) return;
        const delta = e.deltaY * MULTIPLIER;
        const atLeft = el.scrollLeft <= 0;
        const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
        const movingRight = delta > 0;
        const movingLeft = delta < 0;
        const canMoveRight = movingRight && !atRight;
        const canMoveLeft = movingLeft && !atLeft;
        if (canMoveRight || canMoveLeft) {
            e.preventDefault();
            smoothScrollTo(el, el.scrollLeft + delta);
        }
    };

    // touch handlers
    const handleTouchStart = (e) => {
        const t = e.touches && e.touches[0];
        if (t) touchStartRef.current = { x: t.clientX, y: t.clientY };
    };
    const handleTouchMove = (e) => {
        if (!isSectionActive) return;
        const el = rowRef.current;
        if (!el || !touchStartRef.current) return;
        const t = e.touches && e.touches[0];
        if (!t) return;
        const dy = t.clientY - touchStartRef.current.y;
        const dx = t.clientX - touchStartRef.current.x;
        if (Math.abs(dy) > Math.abs(dx)) {
            const delta = -dy * MULTIPLIER;
            const atLeft = el.scrollLeft <= 0;
            const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
            const movingRight = delta > 0;
            const movingLeft = delta < 0;
            const canMoveRight = movingRight && !atRight;
            const canMoveLeft = movingLeft && !atLeft;
            if (canMoveRight || canMoveLeft) {
                e.preventDefault();
                smoothScrollTo(el, el.scrollLeft + delta);
                touchStartRef.current.x = t.clientX;
                touchStartRef.current.y = t.clientY;
            }
        }
    };
    const handleTouchEnd = () => {
        touchStartRef.current = null;
    };

    // hide scrollbars CSS (keeps scroll functionality)
    const noScrollbarCSS = `
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
  `;

    return (
        <section ref={sectionRef} className="w-full relative bg-[#faf4ec]">
            <style>{noScrollbarCSS}</style>

            <div
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    height: isAtHorizontalEnd ? "auto" : "100vh",
                    overflow: "hidden",
                }}
            >
                <div
                    ref={rowRef}
                    className="no-scrollbar flex items-start gap-[50px] px-[50px] box-border"
                    style={{
                        overflowX: "auto",
                        overflowY: "hidden",
                        height: "100%",
                        scrollBehavior: "smooth",
                        paddingTop: 40,
                        paddingBottom: 40,
                        boxSizing: "border-box",
                        alignItems: "flex-start",
                    }}
                >
                    {projects.map((project, i) => {
                        const { family, weight } = parseFontString(project.fontFamily);
                        const titleStyle = {};
                        const dateStyle = {};
                        if (family) {
                            titleStyle.fontFamily = `${family}, Sans-Serif`;
                            dateStyle.fontFamily = `${family}, Sans-Serif`;
                        }
                        if (weight) titleStyle.fontWeight = weight;

                        return (
                            <div key={i} className="flex-shrink-0" style={{ width: 619 }}>
                                <div className="bg-[#c3c3c3] h-[436px] rounded-[40px] overflow-hidden">
                                    <ImageWithFallback src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                                </div>

                                <div className="mt-[16px]">
                                    <p className="text-[18px] uppercase whitespace-pre text-black" style={dateStyle}>
                                        {project.date}
                                    </p>
                                    <p className="text-[32px] uppercase text-black" style={titleStyle}>
                                        {project.title}
                                    </p>

                                    <div className="flex gap-[10px] mt-[8px]">
                                        {project.tags.map((tag, idx) => (
                                            <div key={idx} className={`${tag.variant === "light" ? "bg-[rgba(255,255,255,0.15)]" : "bg-[#dfdad3]"} p-[14px] rounded-[100px]`}>
                                                <p className="text-[18px] uppercase text-black">{tag.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* render below content only after horizontal scroller finished */}
            {/* {isAtHorizontalEnd && (
                <div className="w-full bg-white">
                    <div className="max-w-[1200px] mx-auto p-6">
                        <h2 className="text-2xl font-semibold mb-4">More content below</h2>
                        <p>The horizontal projects scroller finished — vertical page scrolling is now enabled and you can continue down the page.</p>
                    </div>
                </div>
            )} */}
        </section>
    );
}
