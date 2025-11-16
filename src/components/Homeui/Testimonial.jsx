import React from "react";
import WebflowIcon from "../../assets/icons/webflow.svg";

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
    <section className="w-full py-20 bg-[#FAF4EC]">
      {/* Title */}
      <h1 className="text-center text-2xl font-semibold tracking-wide mb-12">
        TESTIMONIALS
      </h1>

      {/* Cards Section */}
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 px-6">

        {testimonials.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} rounded-3xl p-8 shadow-sm h-full flex flex-col`}
          >

            {/* Header */}
            <div className="flex items-center gap-4">
              <img
                src={WebflowIcon}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="font-bold text-lg">{item.name}</h2>
                <p className="text-sm font-semibold">{item.role}</p>
              </div>
            </div>

            {/* Text */}
            <p className="mt-6 leading-relaxed font-medium text-[15px]">
              {item.text}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Testimonial;
