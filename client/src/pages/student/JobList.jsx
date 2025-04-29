import { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { dummyJobs } from "../../assets/assets"; // Adjust path to your dummyJobs file
import { motion, AnimatePresence } from "framer-motion";

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContent = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const JobList = () => {
  const { isSignedIn, signIn } = useClerk();
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);

  const handleApplyClick = (job) => {
    if (!isSignedIn) {
      signIn(); // Trigger Clerk login modal if user is not signed in
    } else {
      setShowModal(true); // Show custom modal if the user is logged in
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Vagas de Emprego
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-600 mb-4">{job.company}</p>
                <p className="text-gray-600 mb-2">{job.salary}</p>
                <p className="text-gray-600 mb-4">{job.location}</p>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <button
                  onClick={() => handleApplyClick(job)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  {isSignedIn ? "Aplicar Agora" : "Faça Login para Aplicar"}
                </button>
              </div>
            </div>
          ))}
        </div>

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
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  🚧 Em desenvolvimento
                </h2>
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
      </div>
    </section>
  );
};

export default JobList;
