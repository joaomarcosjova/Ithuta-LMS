import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Logger from "../Logger";

const Navbar = () => {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate('/educator');
        return;
      }

      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/educator/update-role', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* ------------------------ DESKTOP / LARGE SCREEN NAVBAR ------------------------ */}
      <div
        className={`hidden md:flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-3 ${
          isCourseListPage ? "bg-white" : "bg-cyan-100/70"
        }`}
      >
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Logo"
          className="cursor-pointer"
        />

        {/* Navigation Links */}
        <div className="flex items-center gap-5 text-gray-500">
          <div className="flex items-center gap-5">
            <Logger />
          </div>

          <div className="flex items-center gap-5">
            {user && (
             <>
			 {/* this commented code is the original to access just uncomment and delete the duplicate bellow */}
			 {/* THe duplicate is stopping people from becoming educators for now */}

			 {/* <button onClick={becomeEducator}>{isEducator ? "Educator Dashboard" : "Become Educator" }</button>|{" "} */}
			 <button onClick={becomeEducator}>{isEducator ? "Educator Dashboard" : " " }</button> {" "}
			 <Link to="/my-enrollments">My Enrollments</Link>
		 	</>


            )}
          </div>

          {/* Sign In Button or User Button */}
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-5 py-2 rounded-full"
            >
              Começar
            </button>
          )}
        </div>
      </div>

      {/* ------------------------ MOBILE NAVBAR (BOTTOM) ------------------------ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around items-center py-2 md:hidden z-50 pb-4 pt-4">
        {/* Home Icon */}
        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center text-gray-600 hover:text-blue-600"
        >
          <img
            src={assets.explore_icon}
            alt="Home"
            className="w-6 h-6 transition-all duration-300"
          />
          <span className="text-xs">Início</span>
        </button>

        {/* Courses Icon */}
        <button
          onClick={() => navigate("/course-list")}
          className="flex flex-col items-center text-gray-600 hover:text-blue-600"
        >
          <img
            src={assets.lesson_icon}
            alt="Cursos"
            className="w-6 h-6 transition-all duration-300"
          />
          <span className="text-xs">Cursos</span>
        </button>

        {/* Search Icon */}
        <button
          onClick={() => navigate("/search")}
          className="flex flex-col items-center text-gray-600 hover:text-blue-600"
        >
          <img
            src={assets.search_icon}
            alt="Buscar"
            className="w-6 h-6 transition-all duration-300"
          />
          <span className="text-xs">Buscar</span>
        </button>

        {/* Profile Icon */}
        {/* Sign In Button or User Button */}
		
            <button
              onClick={() => openSignIn()}
			  className="flex flex-col items-center text-gray-600 hover:text-blue-600"
            >
			{user ? ( <UserButton /> ) : (

            <img src={assets.user_icon} alt="Perfil" className="w-6 h-6 transition-all duration-300"/>
				)} 

          	<span className="text-xs">Perfil</span>
		  
            </button>
			
      </div>
    </>
  );
};

export default Navbar;