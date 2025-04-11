import React from 'react'
import { assets } from '../../assets/assets'
import { useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";


const CallToAction = () => {
  const { user } = useUser();
	const { openSignIn } = useClerk();
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'> Aprendizagem sem limites </h1>
      <p className='text-gray-500 sm:text-sm'>
      Se você é um estudante procurando melhorar suas habilidades ou um educador querendo
      <br /> compartilhar conhecimento, Ithuta é a plataforma perfeita para você. 
      </p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        {/* <button className='px-10 py-3 rounded-md text-white bg-blue-600'>Get started</button> */}
        {user ? (
						<a href='#' className="px-10 py-3 rounded-md text-white bg-blue-600"> Get Startd</a>
					) : (
						<button
							onClick={() => openSignIn()}
							className="px-10 py-3 rounded-md text-white bg-blue-600"
						>
							Começar
						</button>
            )}
        <Link to="/privacy-policy">
        <button className='flex items-center gap-2'>Saiba mais <img src={assets.arrow_icon} alt="arrow_icon" /></button>
        </Link>
      </div>
    </div>
  )
}

export default CallToAction
