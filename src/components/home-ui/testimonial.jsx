import React from "react";

const testimonials = [
  {
    name: "Dipak Kumawat",
    role: "Developer",
    text: "PASSIONATE UI/UX DESIGNER WITH A STRONG EYE FOR DETAIL AND A DEEP UNDERSTANDING OF USER-CENTERED DESIGN PRINCIPLES. DELIVERS CLEAN, INTUITIVE, AND HIGH-IMPACT DIGITAL EXPERIENCES.",
    bg: "bg-[#C59BFF]",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Krishna N",
    role: "Owner",
    text: "HIGHLY CREATIVE AND PROFESSIONAL DESIGNER WHO CONSISTENTLY DELIVERS VISUALLY APPEALING AND FUNCTIONAL INTERFACES. STRONGLY FOCUSED ON BRAND CONSISTENCY AND USER EXPERIENCE.",
    bg: "bg-white",
    img: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    name: "Akshay C",
    role: "Developer",
    text: "A SKILLED UI/UX DESIGNER WITH EXCELLENT PROBLEM-SOLVING ABILITIES. CREATES MODERN, USER-FRIENDLY DESIGNS THAT BALANCE AESTHETICS AND USABILITY EFFECTIVELY.",
    bg: "bg-[#A5E9C2]",
    img: "https://randomuser.me/api/portraits/men/68.jpg"
  },
  {
    name: "Swapnil K",
    role: "Developer",
    text: "CONSISTENTLY PRODUCES POLISHED AND THOUGHTFUL DESIGN SOLUTIONS. STRONG UNDERSTANDING OF USER FLOWS, INTERACTION DESIGN, AND VISUAL HIERARCHY ACROSS PLATFORMS.",
    bg: "bg-[#D9D9D9]",
    img: "https://randomuser.me/api/portraits/men/76.jpg"
  }
];

const Testimonial = () => {
  return (
    <section className="w-full p-4 md:p-[50px] 2xl:p-[100px] py-20 bg-[#FAF4EC]">
      {/* Title */}
      <h1 className="text-center font-['TWKEverett'] font-medium text-[20px] text-black uppercase mb-12">
        TESTIMONIALS
      </h1>

      {/* Cards Section */}
      <div className="max-w-[100%] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">

        {testimonials.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} rounded-3xl p-8 shadow-sm h-full flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col justify-center">
                <h2 className="font-['TWKEverett'] font-medium text-[18px] text-black uppercase leading-tight">
                  {item.name}
                </h2>
                <p className="font-['TWKEverett'] font-medium text-[12px] text-black uppercase leading-tight">
                  {item.role}
                </p>
              </div>
            </div>

            {/* Text */}
            <p className="mt-6 font-['TWKEverett'] font-medium text-[18px] text-black uppercase leading-[1.5] opacity-70">
              {item.text}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Testimonial;
