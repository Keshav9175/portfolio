import React, { useState, useRef, useEffect } from "react";
import svgPaths from "../../pages/svg-7gqcb2ot8r";
import { ImageWithFallback } from "../ImageWithFallback";
import avatar from "../../assets/avatar.png";
import aboutVideo from "../../assets/aboutvideo.mp4";
import {
    SiFigma,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiSketch,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiReact,
    SiTailwindcss,
    SiAdobeaftereffects,
    SiAdobepremierepro,
    SiWordpress,
    SiJira,
    SiNotion,
} from "react-icons/si";



// Mocking missing assets for now (kept to match your original structure)
const imgFrame56 = null;
const imgSubtract = null;
const imgLogo21 = null;
const imgFreepikUpsacaleImage87202RemovebgPreviewCopyPng1 = null;
const imgFrame21 = null;
const imgFrame22 = null;
const imgFrame23 = null;
const imgGroup = null;

function ToolLogo({ children }) {
    return (
        <div className="size-[56px] flex items-center justify-center">
            {children}
        </div>
    );
}


export default function AboutPage() {
    const [playing, setPlaying] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            if (playing) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [playing]);

    return (
        <div
            className="bg-[#faf4ec] box-border content-stretch flex flex-col items-center pb-[2px] pt-0 px-0 relative size-full"
            data-name="About">

            <div
                aria-hidden="true"
                className="absolute border-[1px_0px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none"
            />

            {/* Main about content (Frame) */}
            <div className="mb-[-2px] relative shrink-0 w-full px-[16px] md:px-[50px] 2xl:px-[100px]">
                <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
                    <div className="box-border content-stretch flex flex-col gap-[40px] items-center py-[80px] relative w-full">
                        <div className="font-['TWKEverett'] font-black leading-[normal] min-w-full not-italic relative shrink-0 text-[0px] text-[70px] text-black text-center uppercase w-[min-content]">
                            <p className="mb-0">
                                Hello, I<span className="text-black">{`’m Keshav `}</span>
                            </p>
                            <p>UI UX DESIGNER</p>
                        </div>

                        <p className="font-['TWKEverett'] font-medium leading-[34px] not-italic relative shrink-0 text-[22px] text-black text-center uppercase w-[972px]">
                            a passionate UI/UX Designer and Frontend Developer who loves creating clean, user-focused digital experiences.
                            I blend creativity with functionality to design interfaces that are visually appealing and easy to use. Skilled in
                            Figma, Adobe XD, and Illustrator, I also bring designs to life using HTML, CSS, JavaScript, and React.js.
                        </p>

                        {/* three cards area (Frame46) */}
                        <div className="content-stretch flex gap-[40px] items-start relative shrink-0 w-full">

                            {/* CARD 1 – DESIGN TOOLS */}
                            <div className="basis-0 bg-[#dfb5ff] grow rounded-[40px]">
                                <div className="p-[40px] flex flex-col gap-[40px]">
                                    <p className="text-black font-['TWKEverett'] text-[20px] uppercase">Design tools</p>

                                    <div className="flex items-center justify-between w-full text-black">
                                        <ToolLogo><SiFigma size={56} /></ToolLogo>
                                        <ToolLogo><SiAdobeillustrator size={56} className="text-orange-500" /></ToolLogo>
                                        <ToolLogo><SiAdobephotoshop size={56} className="text-blue-500" /></ToolLogo>
                                        <ToolLogo><SiSketch size={56} className="text-yellow-500" /></ToolLogo>
                                        <ToolLogo><SiNotion size={56} /></ToolLogo>
                                    </div>
                                </div>
                            </div>

                            {/* CARD 2 – SKILLS */}
                            <div className="basis-0 bg-[#33c791] grow rounded-[40px]">
                                <div className="p-[40px] flex flex-col gap-[40px]">
                                    <p className="text-black font-['TWKEverett'] text-[20px] uppercase">Skills</p>

                                    <div className="flex items-center justify-between w-full text-black">
                                        <ToolLogo><SiHtml5 size={56} className="text-orange-600" /></ToolLogo>
                                        <ToolLogo><SiCss3 size={56} className="text-blue-600" /></ToolLogo>
                                        <ToolLogo><SiJavascript size={56} className="text-yellow-400" /></ToolLogo>
                                        <ToolLogo><SiReact size={56} className="text-cyan-400" /></ToolLogo>
                                        <ToolLogo><SiTailwindcss size={56} className="text-sky-400" /></ToolLogo>
                                    </div>
                                </div>
                            </div>

                            {/* CARD 3 – OTHER TOOLS */}
                            <div className="basis-0 bg-[#0d8dff] grow rounded-[40px]">
                                <div className="p-[40px] flex flex-col gap-[40px]">
                                    <p className="text-black font-['TWKEverett'] text-[20px] uppercase">
                                        Other
                                    </p>

                                    <div className="flex items-center justify-between w-full text-black">
                                        <ToolLogo><SiAdobeaftereffects size={56} className="text-purple-300" /></ToolLogo>
                                        <ToolLogo><SiAdobepremierepro size={56} className="text-indigo-300" /></ToolLogo>
                                        <ToolLogo><SiWordpress size={56} /></ToolLogo>
                                        <ToolLogo><SiJira size={56} /></ToolLogo>
                                        <ToolLogo><SiNotion size={56} /></ToolLogo>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>

            {/* Video / Subtract area (Frame9) - Masked Video Implementation */}
            <div className="w-full flex items-center justify-center py-20 px-6">
                <div
                    className="relative w-full max-w-[1340px] mx-auto"
                    style={{ width: "100%", maxWidth: 1340, aspectRatio: "1340 / 677" }}
                >
                    {/* SVG mask definition (inline) */}
                    <svg
                        width="0"
                        height="0"
                        style={{ position: "absolute", left: -9999, top: -9999 }}
                        aria-hidden="true"
                    >
                        <defs>
                            <clipPath id="videoshape-clip" clipPathUnits="userSpaceOnUse">
                                <path
                                    d="M1340 575.129C1340 597.22 1322.09 615.129 1300 615.129H1196.94C1179.85 615.129 1166 628.979 1166 646.064C1166 663.15 1152.15 677 1135.06 677H40C17.9086 677 0 659.091 0 637V40C0 17.9086 17.9086 0 40 0H1300C1322.09 0 1340 17.9086 1340 40V575.129Z"
                                    fill="#fff"
                                />
                            </clipPath>
                        </defs>
                    </svg>

                    {/* Always show the video clipped by the SVG. */}
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            WebkitClipPath: "url(#videoshape-clip)",
                            clipPath: "url(#videoshape-clip)",
                            overflow: "hidden",
                        }}
                    >
                        <video
                            ref={videoRef}
                            src={aboutVideo}
                            className="block w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{ pointerEvents: "none" }}
                        />
                    </div>

                    {/* Play pill positioned bottom-right */}
                    <div
                        style={{ bottom: -5, right: 18 }}
                        className="absolute z-20 flex items-center gap-3 px-5 py-3 rounded-full bg-white"
                    >
                        <button
                            onClick={() => setPlaying((p) => !p)}
                            aria-pressed={playing}
                            aria-label={playing ? "Pause video" : "Play video"}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white"
                            style={{ border: "none", padding: 0, display: "inline-flex", cursor: "pointer" }}
                        >
                            {!playing ? (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 2.5L9 6L3 9.5V2.5Z" fill="currentColor" />
                                </svg>
                            ) : (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="2" width="3" height="8" fill="currentColor" />
                                    <rect x="7" y="2" width="3" height="8" fill="currentColor" />
                                </svg>
                            )}
                        </button>

                        <div className="text-sm font-medium text-black">{playing ? "Pause" : "Play"}</div>
                    </div>

                    {/* Optional subtle border/shadow outside the clip */}
                    <svg
                        viewBox="0 0 1340 677"
                        preserveAspectRatio="xMidYMid slice"
                        className="pointer-events-none absolute inset-0 w-full h-full"
                        aria-hidden="true"
                    >
                        <defs>
                            <clipPath id="videoshape-border-clip" clipPathUnits="userSpaceOnUse">
                                <path
                                    d="M1340 575.129C1340 597.22 1322.09 615.129 1300 615.129H1196.94C1179.85 615.129 1166 628.979 1166 646.064C1166 663.15 1152.15 677 1135.06 677H40C17.9086 677 0 659.091 0 637V40C0 17.9086 17.9086 0 40 0H1300C1322.09 0 1340 17.9086 1340 40V575.129Z"
                                    fill="#fff"
                                />
                            </clipPath>
                        </defs>

                        <g clipPath="url(#videoshape-border-clip)">
                            <path
                                d="M1340 575.129C1340 597.22 1322.09 615.129 1300 615.129H1196.94C1179.85 615.129 1166 628.979 1166 646.064C1166 663.15 1152.15 677 1135.06 677H40C17.9086 677 0 659.091 0 637V40C0 17.9086 17.9086 0 40 0H1300C1322.09 0 1340 17.9086 1340 40V575.129Z"
                                fill="none"
                                stroke="rgba(0,0,0,0.06)"
                                strokeWidth="4"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}
