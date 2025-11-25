import React from "react";
import logo from "../assets/logo.svg";

// Temporary social icons (replace with your SVGs later)
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

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
        <button className="
          hidden md:flex 
          items-center gap-2 
          bg-[#FF5C23] 
          text-white 
          px-6 py-3 
          rounded-xl 
          font-semibold 
          text-[15px]
        ">
          WORK WITH ME
          <span className="bg-white text-black rounded-md pt-1 pb-1 pr-2 pl-2 text-sm">↗</span>
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
