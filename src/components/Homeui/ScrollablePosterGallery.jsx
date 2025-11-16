import React from "react";

const ScrollablePosterGallery = () => {
  return (
    <section className="
      flex flex-col 
      w-full h-screen 
      bg-[#FAF4EC] 
      py-12 md:py-20 lg:py-28 
      px-[16px] md:px-[50px] 2xl:px-[100px]
      justify-center
      gap-[40px]   /* 40px gap between heading and images */
    ">

      {/* Top Heading */}
      <div className="flex justify-center">
        <h2 className="text-black">GRAPHICS WORK</h2>
      </div>

      {/* Image Row */}
      <div className="flex justify-between gap-6">
        <div className="bg-amber-700 w-[400px] h-[400px]">
          <img src="" className="w-full h-full" style={{ objectFit: "cover" }} />
        </div>

        <div className="bg-amber-700 w-[400px] h-[400px]">
          <img src="" className="w-full h-full" style={{ objectFit: "cover" }} />
        </div>

        <div className="bg-amber-700 w-[400px] h-[400px]">
          <img src="" className="w-full h-full" style={{ objectFit: "cover" }} />
        </div>
      </div>

      {/* Bottom heading with 20px gap from images */}
      <div className="flex justify-center gap-[20px]">
        <h2 className="font-bold text-[40px] text-black/90">POSTER DESIGN</h2>
      </div>

    </section>
  );
};

export default ScrollablePosterGallery;
