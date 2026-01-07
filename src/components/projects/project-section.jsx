// src/components/Projects/ProjectSection.jsx
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import ImageWithFallback from "../image-with-fallback";

export default function ProjectSection() {
    /* ---------------- CONFIG ---------------- */
    const MULTIPLIER = 2.5;
    const QUICKTO_DURATION = 0.8;
    const QUICKTO_EASE = "power3.out";
    const REVERSE_DIRECTION = true;
    const END_THRESHOLD = 10;

    /* ---------------- STATE ---------------- */
    const [projects, setProjects] = useState([]);
    const [isSectionActive, setIsSectionActive] = useState(false);
    const [isAtHorizontalEnd, setIsAtHorizontalEnd] = useState(false);

    /* ---------------- REFS ---------------- */
    const rowRef = useRef(null);
    const sectionRef = useRef(null);
    const touchStartRef = useRef(null);

    const scrollTarget = useRef(0);
    const proxy = useRef({ x: 0 });
    const quickTo = useRef(null);

    const rafId = useRef(null);
    const atEndRef = useRef(false);
    const autoScrolledRef = useRef(false);

    /* ---------------- FETCH PROJECTS ---------------- */
    useEffect(() => {
        (async () => {
            const q = query(collection(db, "projects"), orderBy("order", "asc"));
            const snap = await getDocs(q);
            setProjects(
                snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
        })();
    }, []);

    /* ---------------- GSAP SETUP ---------------- */
    useEffect(() => {
        const el = rowRef.current;
        if (!el) return;

        scrollTarget.current = el.scrollLeft;
        proxy.current.x = el.scrollLeft;

        quickTo.current = gsap.quickTo(proxy.current, "x", {
            duration: QUICKTO_DURATION,
            ease: QUICKTO_EASE,
            onUpdate: () => {
                el.scrollLeft = proxy.current.x;
            },
        });

        return () => gsap.killTweensOf(proxy.current);
    }, []);

    /* ---------------- INTERSECTION OBSERVER ---------------- */
    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const io = new IntersectionObserver(
            ([e]) => setIsSectionActive(e.isIntersecting && e.intersectionRatio > 0.35),
            { threshold: [0, 0.35, 0.6] }
        );

        io.observe(node);
        return () => io.disconnect();
    }, []);

    /* ---------------- SCROLL END CHECK (OPTIMIZED) ---------------- */
    useEffect(() => {
        const el = rowRef.current;
        if (!el) return;

        const checkEnd = () => {
            // If empty, we are NOT at the "end" in the sense of needing to auto-exit
            if (projects.length === 0) {
                if (atEndRef.current) {
                    atEndRef.current = false;
                    setIsAtHorizontalEnd(false);
                }
                return;
            }

            const max = el.scrollWidth - el.clientWidth;
            const atEnd = el.scrollLeft >= max - END_THRESHOLD;

            if (atEnd !== atEndRef.current) {
                atEndRef.current = atEnd;
                setIsAtHorizontalEnd(atEnd);
            }
        };

        el.addEventListener("scroll", checkEnd, { passive: true });
        checkEnd();

        return () => el.removeEventListener("scroll", checkEnd);
    }, [projects]);

    /* ---------------- BODY LOCK ---------------- */
    useEffect(() => {
        const lock = isSectionActive && !isAtHorizontalEnd;
        const setLock = (shouldLock) => {
            document.documentElement.style.overflow = shouldLock ? "hidden" : "";
            document.body.style.overflow = shouldLock ? "hidden" : "";
        };

        setLock(lock);

        return () => {
            // Always unlock on cleanup/unmount
            setLock(false);
        };
    }, [isSectionActive, isAtHorizontalEnd]);

    /* ---------------- AUTO EXIT ---------------- */
    useEffect(() => {
        if (!isAtHorizontalEnd || autoScrolledRef.current) return;

        // Prevent auto-scroll if projects aren't loaded or content fits
        if (projects.length === 0) return;
        const el = rowRef.current;
        if (el && el.scrollWidth <= el.clientWidth) return;

        autoScrolledRef.current = true;
        requestAnimationFrame(() => {
            const sec = sectionRef.current;
            if (!sec) return;
            window.scrollTo({
                top: sec.offsetTop + sec.offsetHeight,
                behavior: "smooth",
            });
        });
    }, [isAtHorizontalEnd, projects]);

    /* ---------------- UTILS ---------------- */
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const updateScroll = (delta) => {
        const el = rowRef.current;
        if (!el || !quickTo.current) return;

        const max = el.scrollWidth - el.clientWidth;
        scrollTarget.current = clamp(scrollTarget.current + delta, 0, max);
        quickTo.current(scrollTarget.current);
    };

    /* ---------------- WHEEL (RAF BATCHED) ---------------- */
    const handleWheel = (e) => {
        if (!isSectionActive) return;

        const delta = e.deltaY * MULTIPLIER * (REVERSE_DIRECTION ? 1 : -1);
        e.preventDefault();

        if (rafId.current) cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(() => updateScroll(delta));
    };

    /* ---------------- TOUCH ---------------- */
    const handleTouchStart = (e) => {
        const t = e.touches[0];
        touchStartRef.current = { x: t.clientX, y: t.clientY };
    };

    const handleTouchMove = (e) => {
        if (!isSectionActive || !touchStartRef.current) return;

        const t = e.touches[0];
        const dy = t.clientY - touchStartRef.current.y;
        const dx = t.clientX - touchStartRef.current.x;

        if (Math.abs(dy) > Math.abs(dx)) {
            updateScroll(dy * MULTIPLIER * (REVERSE_DIRECTION ? -1 : 1));
            touchStartRef.current = { x: t.clientX, y: t.clientY };
            e.preventDefault();
        }
    };

    /* ---------------- CSS ---------------- */
    const noScrollbarCSS = `
    .no-scrollbar { scrollbar-width: none; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
  `;

    return (
        <section ref={sectionRef} className="w-full_attach bg-[#faf4ec]">
            <style>{noScrollbarCSS}</style>

            <div
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => (touchStartRef.current = null)}
                style={{ height: isAtHorizontalEnd ? "auto" : "100vh", overflow: "hidden" }}
            >
                <div
                    ref={rowRef}
                    className="no-scrollbar flex gap-[50px] px-[50px]"
                    style={{ overflowX: "auto", height: "100%", paddingTop: 40, paddingBottom: 40 }}
                >
                    {projects.map((project) => (
                        <div key={project.id} className="flex-shrink-0" style={{ width: 619 }}>
                            <Link
                                to={`/single-project/${project.id}`}
                                className="block h-[436px] rounded-[40px] overflow-hidden bg-[#c3c3c3]"
                            >
                                <ImageWithFallback
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </Link>

                            <div className="mt-[16px]">
                                <p className="text-[32px] uppercase text-black font-bold">
                                    {project.title}
                                </p>

                                <p className="text-[18px] text-black max-w-[560px] mt-[6px]">
                                    {project.shortDesc}
                                </p>

                                <div className="flex gap-[10px] mt-[12px] flex-wrap">
                                    {project.techStack?.slice(0, 3).map((tech, i) => (
                                        <div
                                            key={i}
                                            className="bg-[#dfdad3] px-[18px] py-[10px] rounded-[100px]"
                                        >
                                            <p className="text-[16px] uppercase text-black">{tech}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
