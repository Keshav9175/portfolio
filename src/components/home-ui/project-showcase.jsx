import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectShowcase() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [projects, setProjects] = useState([]);
  const ARROW_PATH = "M7 17L17 7M17 7H7M17 7V17";

  /* ===============================
     1. FETCH DATA FROM FIREBASE
  =============================== */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));

        const projectData = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          uniqueId: doc.id,
          ...doc.data(),

          // UI styling per card (same as before)
          bg: ["white", "#dfb5ff", "#33c791", "#0d8dff"][index],
          numberColor: ["#64625e", "#c881ff", "#6dffca", "#66b7ff"][index],
          buttonVariant: index === 0 ? "red" : "white",
        }));

        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };

    fetchProjects();
  }, []);

  /* ===============================
     2. GSAP SCROLL ANIMATION
  =============================== */
  useLayoutEffect(() => {
    if (projects.length === 0) return;

    let ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const spacer = 50;

      cards.forEach((card, index) => {
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
  }, [projects]);

  if (projects.length === 0)
    return <div className="min-h-screen bg-[#faf4ec]" />;

  return (
    <div
      ref={containerRef}
      className="bg-[#faf4ec] relative min-h-[300vh] pb-[800px] w-full"
    >
      <div className="flex flex-col items-center w-full">
        <div className="box-border flex flex-col items-center px-[50px] pt-[80px] w-full">
          <p className="font-[TWKEverett] font-medium text-[20px] uppercase text-black mb-[60px]">
            wEB UI Project
          </p>

          {projects.map((project, idx) => (
            <div
              key={project.uniqueId}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="stacking__card h-[680px] relative rounded-[40px] w-full overflow-hidden mb-[50px] origin-top"
              style={{
                backgroundColor: project.bg,
                zIndex: idx + 1,
                willChange: "transform",
              }}
            >
              <div className="box-border flex flex-col gap-[10px] h-[680px] items-start p-[40px] w-full">
                {/* Header */}
                <div className="flex items-center justify-between w-full">
                  <div className="bg-[#faf4ec] box-border flex gap-[10px] items-center justify-center p-[20px] rounded-[10px]">
                    <p className="font-[TWKEverett] font-medium text-[20px] uppercase text-black whitespace-nowrap">
                      {project.tag || "Project"}
                    </p>
                  </div>
                  <p
                    className="font-[TWKEverett] font-bold text-[80px] leading-none text-center whitespace-pre"
                    style={{ color: project.numberColor }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                </div>

                {/* Content */}
                <div className="flex gap-[60px] items-start w-full">
                  <div className="flex flex-col gap-[10px] items-start flex-1">
                    <p className="font-[TWKEverett] font-bold text-[120px] leading-[1.1] text-black whitespace-pre">
                      {project.title}
                    </p>

                    <div className="flex flex-col gap-[10px] items-start">
                      <p className="font-[TWKEverett] font-medium text-[32px] text-black whitespace-pre">
                        {project.shortDesc}
                      </p>

                      <p className="font-[TWKEverett] font-medium text-[28px] text-black w-full max-w-[638px]">
                        <span className="text-[rgba(0,0,0,0.6)]">
                          {project.fullDesc}
                        </span>
                      </p>

                      <Link
                        to={`/single-project/${project.id}`}
                        className="inline-block"
                      >
                        <div
                          className="mt-4 cursor-pointer inline-flex items-center gap-[12px] px-[22px] py-[14px] rounded-[14px]"
                          style={{
                            backgroundColor:
                              project.buttonVariant === "red"
                                ? "#ff4820"
                                : "#ffffff",
                          }}
                        >
                          <p
                            className="font-[TWKEverett] font-medium text-[18px] uppercase"
                            style={{
                              color:
                                project.buttonVariant === "red"
                                  ? "#ffffff"
                                  : "#000000",
                            }}
                          >
                            visit now
                          </p>

                          <div
                            className="flex items-center justify-center p-[10px] rounded-[10px]"
                            style={{
                              backgroundColor:
                                project.buttonVariant === "red"
                                  ? "#ffffff"
                                  : "#000000",
                            }}
                          >
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d={ARROW_PATH}
                                stroke={
                                  project.buttonVariant === "red"
                                    ? "#000000"
                                    : "#ffffff"
                                }
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="flex-1 flex justify-center md:justify-end">
                    <div className="aspect-[1.3] relative rounded-[24px] w-full max-w-[720px] overflow-hidden bg-gray-100">
                      <img
                        src={project.thumbnail}
                        alt={`project-${project.title}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
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
