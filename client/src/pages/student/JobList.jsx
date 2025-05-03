import { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { dummyJobs } from "../../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import  Footer from "../../components/student/Footer";

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContent = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.85 },
};

const JobList = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");

  const handleApplyClick = (job) => {
    if (!user) {
      openSignIn(); // Open Clerk modal sign-in
    } else {
      setShowModal(true);
    }
  };

  const filteredJobs = dummyJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <>
    <section className="py-10 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Vagas de Emprego
        </h2>

        {/* Search input */}
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Filtrar por título de vaga..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 transition hover:shadow-lg"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm mb-2">{job.company}</p>
                  <ul className="text-gray-600 text-sm space-y-1 mb-4">
                    <li><strong>💰 Salário:</strong> {job.salary}</li>
                    <li><strong>📍 Localização:</strong> {job.location}</li>
                  </ul>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-4">
                    {job.description}
                  </p>

                  <button
                    onClick={() => handleApplyClick(job)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Aplicar Agora
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500 text-sm">
              Nenhuma vaga encontrada com esse título.
            </p>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
              variants={modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Fechar
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default JobList;
