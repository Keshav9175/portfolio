import React from "react";
// import WebflowIcon from "../../assets/icons/webflow.svg";

const testimonials = [
  {
    name: "DIPAK KUMAWAT",
    role: "DEVELOPER",
    text: "PASSIONATE AND CREATIVE FREELANCE UI/UX DESIGNER WITH A FOCUS ON CRAFTING INTUITIVE, AND VISUALLY APPEALING INTERFACES THAT ENHANCE USER EXPERIENCE AND BRAND IDENTITY.",
    bg: "bg-[#C59BFF]" // purple card
  },
  {
    name: "DIPAK KUMAWAT",
    role: "DEVELOPER",
    text: "PASSIONATE AND CREATIVE FREELANCE UI/UX DESIGNER WITH A FOCUS ON CRAFTING INTUITIVE, AND VISUALLY APPEALING INTERFACES THAT ENHANCE USER EXPERIENCE AND BRAND IDENTITY.",
    bg: "bg-white"
  },
  {
    name: "DIPAK KUMAWAT",
    role: "DEVELOPER",
    text: "PASSIONATE AND CREATIVE FREELANCE UI/UX DESIGNER WITH A FOCUS ON CRAFTING INTUITIVE, AND VISUALLY APPEALING INTERFACES THAT ENHANCE USER EXPERIENCE AND BRAND IDENTITY.",
    bg: "bg-[#A5E9C2]" // green card
  },
  {
    name: "DIPAK KUMAWAT",
    role: "DEVELOPER",
    text: "PASSIONATE AND CREATIVE FREELANCE UI/UX DESIGNER WITH A FOCUS ON CRAFTING INTUITIVE, AND VISUALLY APPEALING INTERFACES THAT ENHANCE USER EXPERIENCE AND BRAND IDENTITY.",
    bg: "bg-[#D9D9D9]" // grey card
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
      <div className="max-w-[100%] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 ">

        {testimonials.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} rounded-3xl p-8 shadow-sm h-full flex flex-col`}
          >

            {/* Header */}
            <div className="flex items-center gap-4">
              <img
                src="" // Placeholder: WebflowIcon was missing
                alt="profile"
                className="w-12 h-12 rounded-full object-cover bg-gray-300"
              />
              <div className="flex flex-col justify-center">
                <h2 className="font-['TWKEverett'] font-medium text-[18px] text-black uppercase leading-tight">{item.name}</h2>
                <p className="font-['TWKEverett'] font-medium text-[12px] text-black uppercase leading-tight">{item.role}</p>
              </div>
            </div>

            {/* Text */}
            <p className="mt-6 font-['TWKEverett'] font-medium text-[18px] text-black uppercase leading-[1.5]">
              {item.text}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Testimonial;
