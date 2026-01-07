import React from "react";
import logo from "../assets/logo.svg";

// Temporary social icons (replace with your SVGs later)
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FiArrowUpRight } from "react-icons/fi";


const Footer = () => {
  return (
    <footer className="w-full bg-white pt-14 pb-6 font-sans text-black">

      {/* Top Row: Logo + Nav + Button */}
      <div className="
        max-w-[100%] 
        mx-auto 
        flex justify-between items-center 
        px-[16px]
        md:px-[50px]
        2xl:px-[100px]
      ">
        <div className="flex items-center justify-start gap-20">
          {/* Logo */}
          <img src={logo} alt="logo" className="w-50" />

          {/* Center Navigation */}
          <nav className="hidden md:flex gap-10 text-[16px] font-semibold tracking-wide">
            <span>HOME</span>
            <span>ABOUT</span>
            <span>WORK</span>
            <span>CONTACT</span>
          </nav>
        </div>

        {/* Work With Me Button */}
        <button
          className="
            hidden md:flex
            items-center gap-3
            bg-[#ff4820]
            px-6 py-4
            rounded-2xl
            text-white
            uppercase
            font-bold
            shrink-0
          "
        >
          Work With Me
          <div className="bg-white p-2 rounded-lg flex items-center justify-center">
            <FiArrowUpRight size={24} className="text-black" />
          </div>
        </button>


      </div>

      {/* BIG TITLE */}
      <h1
        className="
          text-[120px]
          md:text-[184px]
          xl:text-[276px]
          font-black italic 
          text-center 
          mt-10
          mr-8 
          leading-none 
          text-black
        "
      >
        CREATIVE
      </h1>

      {/* Divider Line */}
      <div
        className="
          w-full h-[1px] bg-black 
          mt-10
        "
      ></div>

      {/* Bottom Row: Social Icons Left, Credits Right */}
      <div
        className="
          max-w-[100%] 
          mx-auto 
          flex justify-between items-center 
          mt-6 
          px-[16px]
          md:px-[50px]
          2xl:px-[100px]
        "
      >
        {/* Social icons */}
        <div className="flex items-center gap-6 text-[20px] text-black">
          <FaFacebookF />
          <FaInstagram />
          <RiTwitterXFill />
          <FaLinkedinIn />
          <FaYoutube />
        </div>

        {/* Developer credit */}
        <p className="text-[16px] tracking-wide text-black">
          Designed And Developed by Keshav
        </p>
      </div>

    </footer>
  );
};

export default Footer;
