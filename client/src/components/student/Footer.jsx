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
          <h1 className="text-gray-800 text-[min(30vw,120px)] font-extrabold font-display tracking-tight leading-none">
            Ithuta
          </h1>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-6 text-sm text-blue-600">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link to="/jobs" className="hover:text-white">Jobs</Link></li>
            <li><Link to="/press" className="hover:text-white">Press</Link></li>
            <li><Link to="/partners" className="hover:text-white">Partners</Link></li>
          </ul>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 text-xl text-gray-400">
            <a href="#"><FaFacebookF className="hover:text-white transition" /></a>
            <a href="#"><FaInstagram className="hover:text-white transition" /></a>
            <a href="#"><FaXTwitter className="hover:text-white transition" /></a>
            <a href="#"><FaGithub className="hover:text-white transition" /></a>
            <a href="#"><FaYoutube className="hover:text-white transition" /></a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2025 Ithuta. A product of{" "}
            <a
              href="https://kadoshsoftwares.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Kadosh Softwares
            </a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
