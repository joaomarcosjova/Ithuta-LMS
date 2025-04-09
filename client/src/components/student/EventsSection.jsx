import React from "react";
import { dummyEvents } from "../../assets/assets";
import { useUser, useClerk } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const EventsSection = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const handleEventClick = (event) => {
    if (!user) {
      openSignIn();
    } else {
      window.open(event.ctaLink, "_blank");
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="pb-20 px-4 md:px-10 text-center bg-white"
    >
      <motion.h2
        className="text-4xl font-extrabold text-gray-900 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌟 Eventos em Destaque
      </motion.h2>

      <motion.p
        className="text-gray-600 md:text-lg max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Descubra experiências exclusivas criadas para transformar sua jornada educacional.
      </motion.p>

      <motion.div
        variants={containerVariants}
        className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto"
      >
        {dummyEvents.map((event, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="relative h-[340px] rounded-2xl shadow-xl overflow-hidden border border-gray-200 bg-cover bg-center flex items-end text-left"
            style={{ backgroundImage: `url(${event.image})` }}
          >
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-0" />

            {/* Content over image */}
            <div className="relative z-10 p-6 w-full text-white flex flex-col justify-between h-full">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="bg-white/20 rounded-full px-3 py-1">{event.date}</span>
                  <span className="bg-white/20 rounded-full px-3 py-1">{event.location}</span>
                </div>

                <h3 className="text-4xl font-bold">{event.title}</h3>
                <p className="text-sm text-white/90 line-clamp-3">{event.description}</p>
              </div>

              <motion.button
                onClick={() => handleEventClick(event)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition"
              >
                {event.ctaText}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default EventsSection;
