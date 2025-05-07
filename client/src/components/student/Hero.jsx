import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";



const Hero = () => {

  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70 to-white transition-colors duration-300">
      
      {/* Heading with animation */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:text-5xl text-2xl font-bold text-gray-800 max-w-3xl mx-auto relative leading-tight"
      >
        Encontre cursos, empregos e muito mais com {" "}
        <span className="text-blue-600">Ithuta</span>
        <motion.img 
          src={assets.sketch} 
          alt="sketch" 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} 
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </motion.h1>


      {/* Description (desktop) */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="text-gray-600 max-w-2xl mx-auto md:block hidden text-lg"
      >
        Aprenda as habilidades mais demandadas pelo mercado e evolua com a maior comunidade tech do país. Comece agora!
      </motion.p>

      {/* Description (mobile) */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="text-gray-600 max-w-sm mx-auto md:hidden text-base"
      >
        Comece a aprender as tecnologias mais buscadas pelas empresas e avance na sua carreira com apoio da Ithuta.
      </motion.p>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        className="w-full max-w-xl"
      >
        <SearchBar />
      </motion.div>
    </div>
  );
};

export default Hero;
