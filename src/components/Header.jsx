// Header.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // <-- fixed import
import svgPaths from "./svg-y0h6aaoeac.js";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";



/* Reference image path (you provided as reference; not used in layout) */
const menuImageUrl = "/mnt/data/Frame 65 (1).png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // lock body scroll while menu open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [isOpen]);

  // close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const menuItems = [
    { label: "Home", id: "home", idx: "01", href: "/" },
    { label: "ABOUT", id: "about", idx: "02", href: "/about" },
    { label: "PROJECT", id: "project", idx: "03", href: "/project" },
    { label: "CONNECT", id: "connect", idx: "04", href: "/connect" },
  ];

  return (
    <>
      {/* ---------- Header ---------- */}
      <header className="bg-[#FAF4EC] mb-[-2px] relative shrink-0 w-full">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex items-center justify-between px-[16px] md:px-[50px] py-[27px] relative w-full">
            {/* Logo + text */}
            <div className="content-stretch flex items-center relative shrink-0">
              <img
                src="/creative.svg"
                alt="Creative Logo"
                className="shrink-0 h-[20px] md:h-[30px] w-auto md:h-[34px] 2xl:h-[28px]"
              />
            </div>

            {/* Menu button (same markup as you had) */}
            <div
              onClick={() => setIsOpen(true)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls="site-menu"
              className="bg-black box-border content-stretch flex gap-[12px] items-center justify-center overflow-clip p-[8px] md:p-[14px] relative rounded-[100px] shrink-0 cursor-pointer"
            >
              <p className="font-[TWKEverett,sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[12px] md:text-[18px] whitespace-nowrap text-white uppercase">
                menu
              </p>

              <div
                className="relative shrink-0 size-[16px] md:size-[24px]"
                data-name="menu-scale"
                aria-hidden="true"
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 24"
                >
                  <g id="menu-scale">
                    <path
                      d="M3 5H11"
                      id="Vector"
                      stroke="var(--stroke-0, white)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M3 12H16"
                      id="Vector_2"
                      stroke="var(--stroke-0, white)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M3 19H21"
                      id="Vector_3"
                      stroke="var(--stroke-0, white)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Menu (merged, with exact classes/structure you provided) ---------- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/25 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen z-[999] flex items-center justify-end"
            >
              {/* Decorative colored bars (purple then orange), sized same as your snippet */}
              <div className="absolute bg-[#b826fc] h-full right-0 top-0 w-[433px]" />
              <div className="absolute bg-[#ff4820] h-full right-0 top-0 w-[408px]" />

              {/* Main menu content — wrapped in style to force TWK_Everett font family */}
              <div
                className="bg-white box-border content-stretch flex flex-col h-full items-start justify-between overflow-clip p-[40px] relative shrink-0 w-[387px]"
                id="site-menu"
                role="dialog"
                aria-modal="true"
                style={{ fontFamily: "TWKEverett, system-ui, sans-serif" }}
              >
                {/* Top section: Close button + Nav items */}
                <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                  {/* Close button */}
                  <div className="relative rounded-[100px] shrink-0 w-full">
                    <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="box-border content-stretch flex gap-[12px] items-center justify-end p-[14px] relative w-full cursor-pointer hover:bg-gray-50 rounded-[100px] transition-colors"
                      >
                        <p className="font-[TWKEverett] font-medium leading-[normal] not-italic relative shrink-0 text-[18px] text-black text-nowrap uppercase whitespace-pre">
                          Close
                        </p>
                        <div
                          className="relative shrink-0 size-[24px]"
                          data-name="cancel"
                        >
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 24 24"
                          >
                            <g id="cancel">
                              <path
                                d={svgPaths.pced3c00}
                                id="Vector"
                                stroke="var(--stroke-0, black)"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                              />
                            </g>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0">
                    {menuItems.map((m) => (
                      <Link
                        key={m.id}
                        to={m.href}
                        onClick={() => setIsOpen(false)}           // close menu after navigation
                        className="content-stretch flex gap-[10px] items-start leading-[normal] not-italic relative shrink-0 text-nowrap uppercase whitespace-pre cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <p className="font-[TWKEverett] font-black relative shrink-0 text-[40px] text-black">
                          {m.label}
                        </p>
                        <p className="font-[TWKEverett] font-medium relative shrink-0 text-[#b826fc] text-[18px]">
                          {m.idx}
                        </p>
                      </Link>
                    ))}
                  </div>

                </div>

                {/* Bottom section: Socials */}
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                  <p className="font-[TWKEverett] font-medium leading-[normal] not-italic relative shrink-0 text-[#b826fc] text-[16px] text-nowrap uppercase whitespace-pre">
                    SOCIALS
                  </p>

                  <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/keshav-divate-1baa55234/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="content-stretch flex gap-[6px] items-center relative shrink-0 hover:opacity-70 transition-opacity"
                    >
                      <div className="relative shrink-0 size-[24px] flex items-center justify-center">
                        <FaLinkedinIn size={18} color="#000000" />
                      </div>
                      <p className="font-[TWKEverett] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap uppercase whitespace-pre">
                        Linkedin
                      </p>
                    </a>

                    {/* YouTube */}
                    <a
                      href="https://www.youtube.com/@Mr_kiki0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="content-stretch flex gap-[6px] items-center relative shrink-0 hover:opacity-70 transition-opacity"
                    >
                      <div className="relative shrink-0 size-[24px] flex items-center justify-center">
                        <FaYoutube size={18} color="#000000" />
                      </div>
                      <p className="font-[TWKEverett] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap uppercase whitespace-pre">
                        YOUTUBE
                      </p>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/keshav.divate1/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="content-stretch flex gap-[6px] items-center relative shrink-0 hover:opacity-70 transition-opacity"
                    >
                      <div className="relative shrink-0 size-[24px] flex items-center justify-center">
                        <FaInstagram size={18} color="#000000" />
                      </div>
                      <p className="font-[TWKEverett] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap uppercase whitespace-pre">
                        INSTA
                      </p>
                    </a>

                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}