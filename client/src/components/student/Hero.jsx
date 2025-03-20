import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70 to-white">
      
      {/* Heading with animation */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:text-5xl text-3xl font-bold text-gray-800 max-w-3xl mx-auto relative leading-tight"
      >
        Desenvolva sua carreira em Tecnologia 
        <span className="text-blue-600"> com Ithuta </span>
        <motion.img 
          src={assets.sketch} 
          alt="sketch" 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} 
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </motion.h1>

      {/* Description Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="text-gray-600 max-w-2xl mx-auto md:block hidden text-lg"
      >
        Aprenda as tecnologias mais demandadas pelo mercado e conquiste o seu próximo nível com a maior comunidade tech do país. Comece hoje e garanta acesso aos cursos e formações.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="text-gray-600 max-w-sm mx-auto md:hidden text-base"
      >
        Aprenda as tecnologias mais demandadas pelo mercado e conquiste o seu próximo nível com a maior comunidade tech do país.
      </motion.p>

      {/* Search Bar with slight animation */}
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
