// AboutHero.jsx
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // your existing firebase.js
import { ImageWithFallback } from "../image-with-fallback";
import ImageTrail from "../animation/image-trail";

const AboutHero = () => {
    const [trailImages, setTrailImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const ref = doc(db, "hover", "yV6SoqJ1rSjcn8Vh0GeV");
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    const data = snap.data();
                    if (Array.isArray(data?.images)) {
                        setTrailImages(data.images.slice(0, 19));
                    }
                }
            } catch (err) {
                console.error("Firestore image fetch error:", err);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className=" bg-[#faf4ec] h-[694px] mb-[-2px] flex justify-center relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-col gap-[60px] h-[694px] items-center justify-center overflow-clip pb-[40px] pt-[20px] relative rounded-[inherit] w-[1440px]">

                {/* IMAGE TRAIL (ONLY THIS IS DYNAMIC) */}
                <div className="absolute h-full w-full" style={{ overflow: 'hidden' }}>
                    {trailImages.length > 0 && (
                        <ImageTrail
                            items={trailImages}
                            variant={1}
                        />
                    )}
                </div>

                {/* HEADING */}
                <div className="font-['TWKEverett'] font-black leading-[160px] not-italic text-[172.979px] text-[#32312F] text-center uppercase whitespace-pre">
                    <p className="mb-0">ABOUT</p>
                    <p>KES&nbsp;&nbsp;&nbsp;&nbsp;HAV</p>
                </div>

                {/* AVATAR */}
                <div
                    className="absolute flex items-center justify-center"
                    style={{
                        height:
                            "calc(1px*((var(--transform-inner-width)*0.030041342601180077)+(var(--transform-inner-height)*0.999548614025116)))",
                        left: "631px",
                        top: "335px",
                        width:
                            "calc(1px*((var(--transform-inner-height)*0.030041342601180077)+(var(--transform-inner-width)*0.999548614025116)))",
                        ["--transform-inner-width"]: "144",
                        ["--transform-inner-height"]: "168",
                    }}
                >
                    <div className="flex-none rotate-[1.721deg]">
                        <div className="h-[168px] w-[144px] relative rounded-[18px]">
                            <ImageWithFallback
                                alt=""
                                src="/avatar.png"
                                className="absolute inset-0 object-cover max-w-none pointer-events-none rounded-[18px] size-full"
                            />
                        </div>
                    </div>
                </div>

                {/* PILL 1 */}
                <div className="absolute bg-white flex gap-[10px] items-center justify-center left-[100px] px-[20px] py-[10px] rounded-[100px] top-[448px]">
                    <div className="absolute border border-black inset-0 rounded-[100px] pointer-events-none shadow-[-6px_6px_0px_0px_#f84600]" />
                    <p className="font-['TWKEverett'] font-medium text-[20px] uppercase text-black whitespace-pre">
                        Think Visually.
                    </p>
                </div>

                {/* PILL 2 */}
                <div className="absolute bg-white flex gap-[10px] items-center justify-center left-[1110px] px-[20px] py-[10px] rounded-[100px] top-[421px]">
                    <div className="absolute border border-black inset-0 rounded-[100px] pointer-events-none shadow-[-6px_6px_0px_0px_#fedc29]" />
                    <p className="font-['TWKEverett'] font-medium text-[20px] uppercase text-black whitespace-pre">
                        Think Visually.
                    </p>
                </div>

                {/* PILL 3 */}
                <div className="absolute bg-white flex gap-[10px] items-center justify-center left-[254px] px-[20px] py-[10px] rounded-[100px] top-[139px]">
                    <div className="absolute border border-black inset-0 rounded-[100px] pointer-events-none shadow-[-6px_6px_0px_0px_#7a25f9]" />
                    <p className="font-['TWKEverett'] font-medium text-[20px] uppercase text-black whitespace-pre">
                        Think Visually.
                    </p>
                </div>

                {/* PILL 4 */}
                <div className="absolute bg-white flex gap-[10px] items-center justify-center left-[925px] px-[20px] py-[10px] rounded-[100px] top-[161px]">
                    <div className="absolute border border-black inset-0 rounded-[100px] pointer-events-none shadow-[-6px_6px_0px_0px_#01c7fe]" />
                    <p className="font-['TWKEverett'] font-medium text-[20px] uppercase text-black whitespace-pre">
                        Your app deserves better clothes.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AboutHero;
