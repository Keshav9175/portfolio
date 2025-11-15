import React from "react";
import { HiMenu } from "react-icons/hi";
import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="px-[16px] py-[30px] md:h-[16vh] md:px-[50px] md:py-[40px] 2xl:px-[100px] bg-[#FAF4EC] flex justify-between items-center">
      {/* Left: Logo */}
      <img
        src={logo}
        alt="Keshav Divate Logo"
        className="md:h-8 h-6 object-contain"
      />

      {/* Right: Menu Button */}
      <button className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-[50px] hover:bg-gray-800 transition">
        <HiMenu className="text-2xl" />
        <span className="text-base font-normal uppercase ">Menu</span>
      </button>
    </header>
  );
}
