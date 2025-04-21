import { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isStandalone && isMobile) {
        setShowBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };

  const dismissBanner = () => setShowBanner(false);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between">
      <div className="text-center sm:text-left mb-2 sm:mb-0">
        <p className="text-lg font-semibold">Instale o Ithuta</p>
        <p className="text-sm">Adicione ao seu dispositivo para um acesso mais rápido</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleInstall}
          className="bg-white text-blue-600 px-4 py-2 rounded-xl font-medium hover:bg-blue-100 transition"
        >
          Instalar
        </button>
        <button
          onClick={dismissBanner}
          className="text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
