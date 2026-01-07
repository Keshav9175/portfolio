import React from "react";
import { Link } from "react-router-dom";

// Temporary social icons (replace with your SVGs later)
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaBehance } from "react-icons/fa";
// import { RiTwitterXFill } from "react-icons/ri"; // Removed as not in contact-page.jsx
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
          <img src="/logo.svg" alt="logo" className="w-50" />

          {/* Center Navigation */}
          <nav className="hidden md:flex gap-10 text-[16px] font-semibold tracking-wide">
            <Link to="/" className="hover:opacity-70 transition-opacity">HOME</Link>
            <Link to="/about" className="hover:opacity-70 transition-opacity">ABOUT</Link>
            <Link to="/project" className="hover:opacity-70 transition-opacity">WORK</Link>
            <Link to="/connect" className="hover:opacity-70 transition-opacity">CONTACT</Link>
          </nav>
        </div>

        {/* Work With Me Button */}
        <Link
          to="/connect"
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
            hover:bg-[#e63e1a] transition-colors
          "
        >
          Work With Me
          <div className="bg-white p-2 rounded-lg flex items-center justify-center">
            <FiArrowUpRight size={24} className="text-black" />
          </div>
        </Link>


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
          <a
            href="https://www.facebook.com/Divatekeshav/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff4820] transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/keshav.divate1/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff4820] transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/keshav-divate-1baa55234/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff4820] transition-colors"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.youtube.com/@Mr_kiki0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff4820] transition-colors"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.behance.net/divateramvadi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff4820] transition-colors"
          >
            <FaBehance />
          </a>
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
