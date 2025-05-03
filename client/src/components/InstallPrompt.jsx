import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isStandalone && isMobile) {
        setShowModal(true);
        document.body.style.overflow = "hidden";
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      console.log("✅ App installed");
      triggerConfetti();
      setShowModal(false);
      setInstallSuccess(true);
      document.body.style.overflow = "";
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      document.body.style.overflow = "";
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("✅ User accepted the install prompt");
        triggerConfetti();
        setInstallSuccess(true);
      }
      setDeferredPrompt(null);
      setShowModal(false);
      document.body.style.overflow = "";
    }
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "";
  };

  const closeSuccess = () => {
    setInstallSuccess(false);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  };

  return (
    <AnimatePresence>
      {/* Install Prompt Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <img src={assets.logo_app} alt="Logo" className="w-12 h-12 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Instale o Ithuta</h2>
            <p className="text-sm text-gray-600 mb-4">
              Para uma experiência mais rápida, segura e completa, adicione o Ithuta à sua tela inicial.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Fechar
              </button>
              <button
                onClick={handleInstall}
                className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Instalar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Success Modal */}
      {installSuccess && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              🎉 Aplicativo instalado!
            </h3>
            <p className="text-sm text-gray-700 mb-4">
             Você agora pode acessar o Ithuta direto da sua tela inicial. Aproveite tudo o que preparamos para sua jornada de aprendizado!
            </p>
            <button
            onClick={closeSuccess}
            className="w-full mt-2 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
            Entendi
          </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPrompt;
