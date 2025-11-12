import React from "react";
import { HiMenu } from "react-icons/hi";
import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="h-[16vh] px-[50px] py-[40px] bg-[#FAF4EC] flex justify-between items-center">
      {/* Left: Logo */}
      <img
        src={logo}
        alt="Keshav Divate Logo"
        className="h-8 object-contain"
      />

      {/* Right: Menu Button */}
      <button className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-[50px] hover:bg-gray-800 transition">
        <HiMenu className="text-2xl" />
        <span className="text-base font-normal uppercase ">Menu</span>
      </button>
    </header>
  );
}
