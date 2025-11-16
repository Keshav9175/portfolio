// src/components/Header.jsx
import React, { useRef } from "react";
import StaggeredMenu from "./StaggeredMenu";
import logo from "../assets/logo.svg";

/**
 * Header that exposes a visible MENU button and uses StaggeredMenu via ref.
 * Place the <StaggeredMenu ref={menuRef} ... /> as a sibling (here it's rendered inside header file for convenience)
 */

export default function Header() {
  const menuRef = useRef(null);

  const menuItems = [
    { label: "HOME", link: "/" },
    { label: "ABOUT", link: "/about" },
    { label: "PROJECT", link: "/projects" },
    { label: "CONNECT", link: "/contact" }
  ];

  const socialItems = [
    { label: "LINKEDIN", link: "https://linkedin.com" },
    { label: "YOUTUBE", link: "https://youtube.com" },
    { label: "INSTA", link: "https://instagram.com" }
  ];

  const handleMenuClick = () => {
    if (menuRef.current && typeof menuRef.current.toggle === "function") {
      menuRef.current.toggle();
    } else {
      console.warn("Menu ref missing or toggle() not available");
    }
  };

  return (
    <>
      <header className="px-[16px] py-[30px] md:h-[16vh] md:px-[50px] md:py-[40px] 2xl:px-[100px] bg-[#FAF4EC] flex justify-between items-center">
        <img src={logo} alt="Keshav Divate Logo" className="md:h-8 h-6 object-contain" />

        {/* Visible menu button */}
        <button
          onClick={handleMenuClick}
          className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-[50px]"
          aria-label="Open menu"
        >
          MENU
        </button>
      </header>

      {/* StaggeredMenu inserted at top-level so it overlays whole screen */}
      <StaggeredMenu
        ref={menuRef}
        position="right"
        colors={["#FF2B8A", "#A63BFF", "#FF5C23"]} // tweak to match your stripes
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={false}
        accentColor="#A63BFF"
        menuButtonColor="#000"
        openMenuButtonColor="#000"
      />
    </>
  );
}
