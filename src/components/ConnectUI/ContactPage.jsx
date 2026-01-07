import React from "react";

// Font Awesome Icons
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaBehance,
    FaRegFileAlt,
    FaFileAlt,
} from "react-icons/fa";

/* -----------------------------
   Square Social Icon Wrapper
----------------------------- */
function SocialIcon({ href, label, children }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="
        relative shrink-0
        size-[55px]
        flex items-center justify-center
        bg-black text-white
        rounded-[12px]
        hover:bg-[#dfdad3] hover:text-black
        transition-all duration-300
      "
        >
            {children}
        </a>
    );
}

/* -----------------------------
   Main Component
----------------------------- */
export default function Connect() {
    const pageFontFamily =
        '"TWKEverett", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

    return (
        <div
            className="bg-[#faf4ec] flex flex-col items-center size-full relative"
            style={{ fontFamily: pageFontFamily }}
        >
            <div className="md:w-[1440px] w-full px-[50px] py-[80px] flex gap-[60px]">

                {/* LEFT */}
                <div className="flex-1">
                    <p className="font-black text-[70px] uppercase text-black">
                        ware to connect.
                    </p>
                </div>

                {/* RIGHT */}
                <div className="flex-1 flex flex-col gap-[60px]">

                    {/* Get in touch */}
                    <div>
                        <p className="uppercase text-[18px] font-medium text-black">
                            Get in touch
                        </p>
                        <p className="text-[32px] font-bold uppercase text-black">
                            +91-9175853875
                        </p>
                        <p className="text-[32px] font-bold text-black">
                            keshavdivate86@gmail.com
                        </p>
                    </div>

                    {/* Social Links */}
                    <div>
                        <p className="uppercase text-[18px] font-medium mb-[20px] text-black">
                            Connect on socials
                        </p>

                        <div className="flex gap-[27.5px]">

                            <SocialIcon
                                href="https://www.linkedin.com/in/keshav-divate-1baa55234/"
                                label="LinkedIn"
                            >
                                <FaLinkedinIn size={28} />
                            </SocialIcon>

                            <SocialIcon
                                href="https://www.youtube.com/@Mr_kiki0"
                                label="YouTube"
                            >
                                <FaYoutube size={28} />
                            </SocialIcon>

                            <SocialIcon
                                href="https://www.behance.net/divateramvadi"
                                label="Behance"
                            >
                                <FaBehance size={28} />
                            </SocialIcon>

                            <SocialIcon
                                href="https://www.instagram.com/keshav.divate1/"
                                label="Instagram"
                            >
                                <FaInstagram size={28} />
                            </SocialIcon>

                            <SocialIcon
                                href="https://www.facebook.com/Divatekeshav/"
                                label="Facebook"
                            >
                                <FaFacebookF size={28} />
                            </SocialIcon>

                        </div>
                    </div>

                    {/* Resume & Boucher */}
                    <div className="flex gap-[20px]">

                        {/* Resume */}
                        <div className="bg-black text-white flex items-center gap-[10px] px-[24px] py-[14px] rounded-full">
                            <FaRegFileAlt size={20} />
                            <span className="uppercase text-[18px] font-medium">
                                Resume
                            </span>
                        </div>

                        {/* Boucher */}
                        <div className="bg-[#dfdad3] text-black flex items-center gap-[10px] px-[24px] py-[14px] rounded-full">
                            <FaFileAlt size={20} />
                            <span className="uppercase text-[18px] font-medium">
                                Boucher
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="absolute inset-0 border-t border-black/10 pointer-events-none" />
        </div>
    );
}
