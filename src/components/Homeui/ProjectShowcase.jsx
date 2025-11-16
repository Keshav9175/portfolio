import React from "react";

// Import your images from assets
import project1 from "../../assets/Projects/project1.png";
import project2 from "../../assets/Projects/project1.png";
import project3 from "../../assets/Projects/project1.png";
import project4 from "../../assets/Projects/project1.png";

export default function ProjectShowcase() {
  // Your project data (all unique)
  const projects = [
    {
      id: 1,
      title: "Snakiy",
      subtitle:
        "Keshav Divate is a passionate UI/UX designer and developer who blends creativity with technology Keshav Divate is a passionate UI/UX designer and developer who blends creativity with technology .",
      image: project1,
      link: "#",
    },
    {
      id: 2,
      title: "Travelly",
      subtitle:
        "A travel planning dashboard focusing on clean UI, micro-interactions and smooth navigation Keshav Divate is a passionate UI/UX designer and developer who blends creativity with technology.",
      image: project2,
      link: "#",
    },
    {
      id: 3,
      title: "BetterFund",
      subtitle:
        "A blockchain-based crowdfunding solution with milestone tracking and transparent user experience Keshav Divate is a passionate UI/UX designer and developer who blends creativity with technology.",
      image: project3,
      link: "#",
    },
    {
      id: 4,
      title: "KoolWorld",
      subtitle:
        "A fun and engaging travel UI design project with intelligent suggestions and modern card layouts Keshav Divate is a passionate UI/UX designer and developer who blends creativity with technology.",
      image: project4,
      link: "#",
    },
  ];

  return (
    <div
      className="
        min-h-screen bg-[#FAF4EC]
        flex flex-col items-center justify-center
        px-[16px] py-[40px]
        md:px-[100px] md:py-[80px]
        gap-[60px]
      "
    >
      {/* Wrapper for all project cards */}
      <div className="flex flex-col items-center gap-[60px] w-full">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="
              bg-white rounded-3xl shadow-sm relative
              flex flex-col md:flex-row
              items-center justify-between
              p-8 md:p-12
              gap-[40px] md:gap-[60px]
            "
            style={{
              width: "90vw",
              height: "80vh",
            }}
          >
            {/* Section Number */}
            <div className="absolute right-10 top-8 text-[60px] md:text-[80px] font-extrabold text-gray-400 select-none">
              {String(idx + 1).padStart(2, "0")}
            </div>

            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center gap-[24px] z-10">
              <div className="bg-[#FBF0E6] text-black px-4 py-2 w-fit rounded-lg">
                <span className="text-sm font-medium">PROJECT</span>
              </div>

              <h1 className="text-[60px] md:text-[110px] leading-[0.9] font-extrabold text-black">
                {proj.title}
              </h1>

              <p className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
                {proj.subtitle}
              </p>

              <a
                href={proj.link}
                className="inline-flex items-center gap-2 bg-[#FF5A38] text-white px-5 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition w-fit"
              >
                VISIT NOW
                <span className="bg-white text-[#FF5A38] rounded-md px-2 py-1">↗</span>
              </a>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <img
                src={proj.image}
                alt={proj.title}
                className="rounded-2xl w-[90%] md:w-[80%] object-cover"
                style={{ maxHeight: "60vh" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
