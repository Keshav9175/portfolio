import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // your existing firebase.js
import ImageTrail from "../animation/image-trail";

/* responsive badges: desktop uses px left/top, mobile uses percentage left/top.
   Mobile values are centered using transform: translate(-50%,-50%) so badges don't
   get cut off when placed near the edges. Parent allows overflow-visible on mobile.
*/

const badges = [
    {
        id: 1,
        text: "Design something cool",
        left: 233,
        top: 422,
        mobileLeft: "38%",
        mobileTop: "65%",
        shadow: "#f84600",
    },
    {
        id: 2,
        text: "LETS SOLVE PROBLEMS TOGETHER",
        left: 947,
        top: 243,
        mobileLeft: "50%",
        mobileTop: "30%",
        shadow: "#7a25f9",
    },
    {
        id: 3,
        text: "YEH!!",
        left: 332,
        top: 127,
        mobileLeft: "80%",
        mobileTop: "40%",
        shadow: "#01c7fe",
    },
    {
        id: 4,
        text: "lets Connects",
        left: 840,
        top: 504,
        mobileLeft: "80%",
        mobileTop: "60%",
        shadow: "#fe7524",
    },
];

function BadgeButton({ text, themeShadow, size = "md" }) {
    const padding = size === "sm" ? "px-[10px] py-[6px]" : "px-[20px] py-[10px]";
    const textSize = size === "sm" ? "text-[12px]" : "text-[20px]";
    const boxShadow = size === "sm" ? "-3px 3px 0px 0px" : "-6px 6px 0px 0px";

    return (
        <div
            className={`bg-white box-border flex items-center justify-center rounded-[100px] ${padding} max-w-[85vw]`}
            role="button"
            tabIndex={0}
        >
            <div
                aria-hidden="true"
                className="absolute border border-black inset-0 pointer-events-none rounded-[100px]"
                style={{ boxShadow: `${boxShadow} ${themeShadow}` }}
            />
            <p
                className={`font-[TWKEverett,sans-serif] font-medium relative whitespace-nowrap text-black uppercase m-0 ${textSize}`}
            >
                {text}
            </p>
        </div>
    );
}

export default function ConnectHero() {
    const [trailImages, setTrailImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const ref = doc(db, "hover", "65hOn47nOBG6OubAzAfB");
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    const data = snap.data();
                    if (Array.isArray(data?.images)) {
                        setTrailImages(data.images.slice(0, 13));
                    }
                }
            } catch (err) {
                console.error("Firestore ImageTrail fetch error:", err);
            }
        };

        fetchImages();
    }, []);

    return (
        <section className=" bg-[#FAF4EC] h-[400px] md:h-[694px] mb-[-2px] relative shrink-0 w-full z-0">
            <div className="absolute h-full w-full" style={{ overflow: "hidden" }}>
                {trailImages.length > 0 && (
                    <ImageTrail items={trailImages} variant={1} />
                )}
            </div>

            <div className="box-border flex flex-col gap-[60px] h-[400px] md:h-[694px] items-center justify-center md:overflow-clip overflow-visible pb-[40px] pt-[20px] px-[20px] relative rounded-[inherit] w-full">
                <div className="font-[TWKEverett,sans-serif] font-black leading-[60px] md:leading-[160px] text-[66px] md:text-[172.979px] text-[#32312F] text-center uppercase">
                    <p className="mb-0">Work</p>
                    <p className="mb-0">with</p>
                    <p>me</p>
                </div>

                {/* DESKTOP BADGES */}
                {badges.map((b) => (
                    <div
                        key={`desk-${b.id}`}
                        className="hidden md:block absolute"
                        style={{ left: `${b.left}px`, top: `${b.top}px` }}
                    >
                        <BadgeButton text={b.text} themeShadow={b.shadow} size="md" />
                    </div>
                ))}

                {/* MOBILE BADGES */}
                {badges.map((b) => (
                    <div
                        key={`mob-${b.id}`}
                        className="md:hidden absolute"
                        style={{
                            left: b.mobileLeft,
                            top: b.mobileTop,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <BadgeButton text={b.text} themeShadow={b.shadow} size="sm" />
                    </div>
                ))}
            </div>

            <div
                aria-hidden="true"
                className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] inset-0 pointer-events-none"
            />
        </section>
    );
}
