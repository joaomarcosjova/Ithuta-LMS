import React, { useState } from "react";
import { dummyChallenges } from "../../assets/dummyChallenges";
import { useUser, useClerk } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion"; // 👈 AnimatePresence adicionado

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

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContent = {
  hidden: { opacity: 0, scale: 0.8, y: -50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } },
};

const ChallengesSection = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [showModal, setShowModal] = useState(false);

  const handleEventClick = (event) => {
    if (!user) {
      openSignIn();
    } else {
      setShowModal(true); // 👈 Mostrar modal se logado
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
        className="text-3xl font-medium text-gray-800 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Entrevistas simuladas
      </motion.h2>

      <motion.p
        className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mt-3 px-4 text-center sm:text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Prepare-se para sua próxima entrevista de emprego. Teste suas habilidades com desafios reais usados por empresas de tecnologia.
      </motion.p>

      <motion.div
        variants={containerVariants}
        className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto"
      >
        {dummyChallenges.map((event, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="relative h-[340px] rounded-2xl shadow-xl overflow-hidden border border-gray-200 bg-cover bg-center flex items-end text-left"
            style={{ backgroundImage: `url(${event.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-0" />

            <div className="relative z-10 p-6 w-full text-white flex flex-col justify-between h-full">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                {event.techstack.slice(0, 10).map((techstack, idx) => (
                    <span
                      key={idx}
                      className="bg-white/20 px-3 py-1 text-xs rounded-xl"
                    >
                      {techstack}
                    </span>
                  ))}
                </div>

                <h3 className="text-5xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                  {event.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-white/90 line-clamp-3">
                  {event.description}
                </p>
              </div>

              <motion.button
                onClick={() => handleEventClick(event)}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition"
              >
                {event.ctaText}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 👇 Modal com animações */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4"
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🚧 Em desenvolvimento</h2>
              <p className="text-gray-600 mb-6">
                Esta funcionalidade ainda está em construção. Volte em breve!
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ChallengesSection;
