import React from "react";

export default function Services() {
  return (
    <section className="relative bg-[#FAF4EC] px-[50px] py-10 md:py-20 text-black flex flex-col gap-5 md:gap-10 justify-center text-center">
      {/* Section Heading */}
      <h3
        className="text-[16px] md:text-[22px] font-normal tracking-wide"
      >
        WHAT HE DOES
      </h3>

      {/* Container for the text lines */}
      <div className="relative flex flex-col items-center justify-center gap-4 md:gap-6">
        {/* Row 1 */}
        <div
          className="relative text-[24px] md:text-[clamp(48px,6vw,90px)] italic font-extrabold leading-tight"
          style={{ fontFamily: "TWKEverett" }}
        >
          UI UX DESIGN
          <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-6 h-6 bg-[#8a39ff] rounded-full"></div>
        </div>

        {/* Row 2 */}
        <div
          className="relative text-[24px] md:text-[clamp(48px,6vw,90px)] italic font-extrabold leading-tight"
          style={{ fontFamily: "TWKEverett" }}
        >
          WEB DEVELOPMENT
          <div className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-6 h-6 bg-[#00a7ff] rounded-full"></div>
        </div>

        {/* Row 3 */}
        <div
          className="relative text-[24px] md:text-[clamp(48px,6vw,90px)] italic font-extrabold leading-tight"
          style={{ fontFamily: "TWKEverett" }}
        >
          LOGO DESIGN
          <div className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-6 h-6 bg-[#ff4b2b] rounded-full"></div>
        </div>

        {/* Row 4 */}
        <div
          className="relative text-[24px] md:text-[clamp(48px,6vw,90px)] italic font-extrabold leading-tight"
          style={{ fontFamily: "TWKEverett" }}
        >
          GRAPHIC DESIGN
          <div className="absolute right-[-45px] top-1/2 -translate-y-1/2 w-6 h-6 bg-[#ffb400] rounded-full"></div>
        </div>

        {/* Row 5 */}
        <div
          className="relative text-[24px] md:text-[clamp(48px,6vw,90px)] italic font-extrabold leading-tight"
          style={{ fontFamily: "TWKEverett" }}
        >
          VIDEO EDITING
          <div className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-6 h-6 bg-[#00c2a2] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
