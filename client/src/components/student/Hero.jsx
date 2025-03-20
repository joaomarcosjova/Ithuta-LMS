import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>
      {/* <h1 className="text-5xl font-bold text-pink-500 m-10 mt-0 underline running-text">
  In Development mode
</h1> */}

      <h1 className='md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto'>
      Desenvolva sua carreira em Tecnologia  <span className='text-blue-600'> com Ithuta </span> <img src={assets.sketch} alt="sketch" className='md:block hidden absolute -bottom-7 right-0' /></h1>

      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>Aprenda as tecnologias mais demandadas pelo mercado e conquiste o seu próximo nível com a maior comunidade tech do país. Comece hoje e garanta acesso aos cursos e formações.</p>

      <p className='md:hidden text-gray-500 max-w-sm mx-auto'>Aprenda as tecnologias mais demandadas pelo mercado e conquiste o seu próximo nível com a maior comunidade tech do país.</p>

      <SearchBar />
    </div>
  )
}

export default Hero


