// src/components/Projects/ProjectSection.jsx
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import ImageWithFallback from "../ImageWithFallback";

export default function ProjectSection() {
    // ---------------- CONFIG ----------------
    const MULTIPLIER = 2.5;
    const QUICKTO_DURATION = 0.8;
    const QUICKTO_EASE = "power3.out";
    const REVERSE_DIRECTION = true;
    const END_THRESHOLD = 10;

    // ---------------- STATE ----------------
    const [projects, setProjects] = useState([]);

    // ---------------- REFS ----------------
    const rowRef = useRef(null);
    const sectionRef = useRef(null);
    const touchStartRef = useRef(null);

    const scrollTargetRef = useRef(0);
    const proxyRef = useRef({ x: 0 });
    const quickToRef = useRef(null);
    const autoScrolledRef = useRef(false);

    const [isSectionActive, setIsSectionActive] = useState(false);
    const [isAtHorizontalEnd, setIsAtHorizontalEnd] = useState(false);

    // ---------------- FETCH PROJECTS ----------------
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const q = query(collection(db, "projects"), orderBy("order", "asc"));
                const snap = await getDocs(q);

                const data = snap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProjects(data);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
            }
        };

        fetchProjects();
    }, []);

    // ---------------- GSAP SETUP ----------------
    useEffect(() => {
        if (!rowRef.current) return;

        scrollTargetRef.current = rowRef.current.scrollLeft;
        proxyRef.current.x = rowRef.current.scrollLeft;

        quickToRef.current = gsap.quickTo(proxyRef.current, "x", {
            duration: QUICKTO_DURATION,
            ease: QUICKTO_EASE,
            onUpdate: () => {
                if (rowRef.current) {
                    rowRef.current.scrollLeft = proxyRef.current.x;
                }
            },
        });

        return () => {
            gsap.killTweensOf(proxyRef.current);
            quickToRef.current = null;
        };
    }, []);

    // ---------------- INTERSECTION OBSERVER ----------------
    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                setIsSectionActive(entry.isIntersecting && entry.intersectionRatio > 0.35);
            },
            { threshold: [0, 0.15, 0.35, 0.6] }
        );

        io.observe(node);
        return () => io.disconnect();
    }, []);

    // ---------------- SCROLL END MONITOR ----------------
    useEffect(() => {
        const el = rowRef.current;
        if (!el) return;

        const onScroll = () => {
            const max = el.scrollWidth - el.clientWidth;
            setIsAtHorizontalEnd(el.scrollLeft >= Math.max(0, max - END_THRESHOLD));
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    // ---------------- BODY LOCK ----------------
    useEffect(() => {
        const shouldLock = isSectionActive && !isAtHorizontalEnd;

        document.body.style.overflow = shouldLock ? "hidden" : "";
        document.documentElement.style.overflow = shouldLock ? "hidden" : "";
    }, [isSectionActive, isAtHorizontalEnd]);

    // ---------------- AUTO EXIT ----------------
    useEffect(() => {
        if (!isAtHorizontalEnd || autoScrolledRef.current) return;

        setTimeout(() => {
            const sec = sectionRef.current;
            if (!sec) return;

            window.scrollTo({
                top: sec.offsetTop + sec.offsetHeight,
                behavior: "smooth",
            });

            autoScrolledRef.current = true;
        }, 80);
    }, [isAtHorizontalEnd]);

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    // ---------------- SCROLL UPDATE ----------------
    const updateScrollTarget = (delta) => {
        const el = rowRef.current;
        if (!el || !quickToRef.current) return;

        const maxScroll = el.scrollWidth - el.clientWidth;
        scrollTargetRef.current = clamp(
            scrollTargetRef.current + delta,
            0,
            maxScroll
        );

        quickToRef.current(scrollTargetRef.current);
    };

    // ---------------- WHEEL ----------------
    const handleWheel = (e) => {
        if (!isSectionActive) return;

        const el = rowRef.current;
        if (!el) return;

        const max = el.scrollWidth - el.clientWidth;
        const atLeft = scrollTargetRef.current <= 0;
        const atRight = scrollTargetRef.current >= max;

        const delta = e.deltaY * MULTIPLIER * (REVERSE_DIRECTION ? 1 : -1);

        if ((delta > 0 && !atRight) || (delta < 0 && !atLeft)) {
            e.preventDefault();
            updateScrollTarget(delta);
        }
    };

    // ---------------- TOUCH ----------------
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
            updateScrollTarget(dy * MULTIPLIER * (REVERSE_DIRECTION ? -1 : 1));
            touchStartRef.current = { x: t.clientX, y: t.clientY };
            e.preventDefault();
        }
    };

    // ---------------- CSS ----------------
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
                style={{
                    height: isAtHorizontalEnd ? "auto" : "100vh",
                    overflow: "hidden",
                }}
            >
                <div
                    ref={rowRef}
                    className="no-scrollbar flex gap-[50px] px-[50px]"
                    style={{
                        overflowX: "auto",
                        height: "100%",
                        paddingTop: 40,
                        paddingBottom: 40,
                    }}
                >
                    {projects.map((project) => (
                        <div key={project.id} className="flex-shrink-0" style={{ width: 619 }}>
                            {/* Thumbnail */}
                            <Link to={`/single-project/${project.id}`} className="block h-[436px] rounded-[40px] overflow-hidden bg-[#c3c3c3] cursor-pointer">
                                <ImageWithFallback
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </Link>

                            {/* Content */}
                            <div className="mt-[16px]">

                                {/* Title */}
                                <p className="text-[32px] uppercase text-black font-bold">
                                    {project.title}
                                </p>

                                {/* Short Description */}
                                <p className="text-[18px] text-black max-w-[560px] mt-[6px]">
                                    {project.shortDesc}
                                </p>

                                {/* Tech Stack Pills */}
                                <div className="flex gap-[10px] mt-[12px] flex-wrap">
                                    {project.techStack?.slice(0, 3).map((tech, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-[#dfdad3] px-[18px] py-[10px] rounded-[100px]"
                                        >
                                            <p className="text-[16px] uppercase text-black">
                                                {tech}
                                            </p>
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
