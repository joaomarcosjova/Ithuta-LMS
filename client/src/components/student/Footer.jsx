import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-cyan-100/70 to-white py-12 px-4 sm:px-6 lg:px-12 mt-16">
      <div className="text-black">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Big Ithuta Branding */}
          <h1 className="text-gray-800 text-[min(30vw,420px)] font-extrabold font-display tracking-tight leading-none">
            Ithuta
          </h1>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 text-xl text-gray-800">
            <a href="#"><FaFacebookF className="hover:text-white transition" /></a>
            <a href="#"><FaInstagram className="hover:text-white transition" /></a>
            <a href="#"><FaXTwitter className="hover:text-white transition" /></a>
            <a href="#"><FaGithub className="hover:text-white transition" /></a>
            <a href="#"><FaYoutube className="hover:text-white transition" /></a>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-6 text-sm text-blue-600">
            <li><Link to="/course-list" className="hover:text-white">Cursos</Link></li>
            <li><Link to="/mentors-list" className="hover:text-white">Mentores</Link></li>
            <li><Link to="/press" className="hover:text-white">Press</Link></li>
            <li><Link to="/partners" className="hover:text-white">Partners</Link></li>
          </ul>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
