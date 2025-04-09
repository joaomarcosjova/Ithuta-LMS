import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../../assets/assets';

const logos = [
  assets.python,
  assets.javascript,
  assets.react,
  assets.excel,
  assets.java,
  assets.kotlin,
  assets.node,
  assets.sql,
  assets.swift,
  assets.typescript,
];

const DraggableStack = () => {
  const [dragProgress, setDragProgress] = useState(0);
  const dragRef = useRef(0);

  const handleDrag = (_, info) => {
    const distance = Math.abs(info.delta.x) + Math.abs(info.delta.y);
    dragRef.current = Math.min(dragRef.current + distance, 2000); // slowed down
    setDragProgress(dragRef.current);
  };

  const revealText = "Jesus Cristo te Ama";
  const revealFraction = dragProgress / 2000; // slower reveal
  const revealedLength = Math.floor(revealFraction * revealText.length);
  const revealedText = revealText.substring(0, revealedLength);

  return (
    <div className="pt-16 px-4 md:px-12">
      <p className="text-center text-base text-gray-500 mb-6">
        Move a imagem, descubra um segredo
      </p>

      {/* Logo Grid */}
      <div className="grid grid-cols-5 gap-4 md:gap-10 justify-items-center">
        {logos.map((logo, index) => (
          <motion.div
            key={index}
            drag
            dragConstraints={{ top: -80, bottom: 80, left: -80, right: 80 }}
            dragElastic={0.3}
            onDrag={handleDrag}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            whileDrag={{ scale: 0.9, rotate: 10 }}
            className="cursor-grab active:cursor-grabbing"
          >
            <img
              src={logo}
              alt={`logo-${index}`}
              className="w-12 sm:w-14 md:w-16 lg:w-20 pointer-events-none transition-transform"
            />
          </motion.div>
        ))}
      </div>

      {/* Progressive Reveal Message */}
      <motion.p
        className="text-center mt-8 text-lg md:text-xl font-semibold text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealedText.length > 0 ? 1 : 0 }}
      >
        {revealedText}
      </motion.p>
    </div>
  );
};

export default DraggableStack;
