import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaWeebly,
//   FaFacebookF,
//   FaInstagram,
//   FaXTwitter,
//   FaGithub,
//   FaYoutube,
// } from "react-icons/fa6";

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
          {/* <div className="flex justify-center gap-6 text-xl text-gray-800">
            <a href="https://www.linkedin.com/in/joaomarcosjova/"><FaWeebly className="hover:text-blue-600 transition" /></a>
            <a href="https://instagram.com/ithuta.app"><FaInstagram className="hover:text-blue-600 transition" /></a>
            <a href="#"><FaGithub className="hover:text-blue-600 transition" /></a>
            <a href="https://youtu.be/m2uSJS9Wx9Y"><FaYoutube className="hover:text-blue-600 transition" /></a>
          </div> */}

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-6 text-sm text-blue-600">
            {/* <li><Link to="/course-list" className="hover:text-gray-800">Cursos</Link></li>
            <li><Link to="/mentors-list" className="hover:text-gray-800">Mentores</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-gray-800">Política de Privacidade</Link></li> */}
          </ul>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
