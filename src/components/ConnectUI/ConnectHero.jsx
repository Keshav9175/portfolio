import React from "react";
import ImageTrail from "../Animation/ImageTrail";
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
    // size: "md" (desktop) or "sm" (mobile)
    const padding = size === "sm" ? "px-[10px] py-[6px]" : "px-[20px] py-[10px]";
    const textSize = size === "sm" ? "text-[12px]" : "text-[20px]";
    const boxShadow = size === "sm" ? "-3px 3px 0px 0px" : "-6px 6px 0px 0px";

    return (
        <div
            className={`bg-white box-border flex items-center justify-center rounded-[100px] ${padding} max-w-[85vw]`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") e.currentTarget.click();
            }}
        >
            <div
                aria-hidden="true"
                className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[100px]"
                style={{ boxShadow: `${boxShadow} ${themeShadow}` }}
            />
            <p className={`font-[TWKEverett,sans-serif] font-medium not-italic relative shrink-0 whitespace-nowrap text-black uppercase m-0 ${textSize}`}>
                {text}
            </p>
        </div>
    );
}

export default function ConnectHero() {
    return (
        <section className=" bg-[#FAF4EC] h-[400px] md:h-[694px] mb-[-2px] relative shrink-0 w-full z-0">
            <div className="absolute h-full w-full" style={{ overflow: 'hidden' }}>
                <ImageTrail
                    items={[
                        'https://picsum.photos/id/287/300/300',
                        'https://picsum.photos/id/1001/300/300',
                        'https://picsum.photos/id/1025/300/300',
                        'https://picsum.photos/id/1026/300/300',
                        'https://picsum.photos/id/1027/300/300',
                        'https://picsum.photos/id/1028/300/300',
                        'https://picsum.photos/id/1029/300/300',
                        'https://picsum.photos/id/1030/300/300',
                        // ...
                    ]}
                    variant={1}
                />
            </div>
            <div className="box-border flex flex-col gap-[60px] h-[400px] md:h-[694px] items-center justify-center md:overflow-clip overflow-visible pb-[40px] pt-[20px] px-[20px] relative rounded-[inherit] w-full">
                <div className="font-[TWKEverett,sans-serif] font-black leading-[60px] md:leading-[160px] not-italic relative shrink-0 text-[66px] md:text-[172.979px]  text-[#32312F] text-center whitespace-nowrap uppercase">
                    <p className="mb-0">Work</p>
                    <p className="mb-0">with</p>
                    <p>me</p>
                </div>

                {/* DESKTOP: absolutely positioned badges (visible md and up) */}
                {badges.map((b) => (
                    <div
                        key={`desk-${b.id}`}
                        className="hidden md:block absolute"
                        style={{
                            left: `${b.left}px`,
                            top: `${b.top}px`,
                            // keep original desktop shadow by using the inner div in BadgeButton
                        }}
                    // ensure transform only applies if you want pixel-perfect desktop:
                    // desktop kept unchanged (no translate). If you prefer centering there too,
                    // uncomment transform: 'translate(-50%, -50%)'
                    >
                        <BadgeButton text={b.text} themeShadow={b.shadow} size="md" />
                    </div>
                ))}

                {/* MOBILE: use percentage coordinates + translate(-50%,-50%) so the badge is centered
             at that coordinate and won't be cut off even if mobileTop is 85% */
                    badges.map((b) => (
                        <div
                            key={`mob-${b.id}`}
                            className="md:hidden absolute"
                            style={{
                                left: b.mobileLeft,
                                top: b.mobileTop,
                                transform: "translate(-50%, -50%)",
                                // keep pointer events if you want them interactive on mobile
                            }}
                        >
                            <BadgeButton text={b.text} themeShadow={b.shadow} size="sm" />
                        </div>
                    ))}
            </div>

            {/* subtle bottom border overlay (keeps original intent) */}
            <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
        </section>
    );
}