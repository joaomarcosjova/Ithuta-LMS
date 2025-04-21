import { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isStandalone && isMobile) {
        setShowBanner(true);
        setTimeout(() => setAnimate(true), 100); // allow animation to trigger
        setTimeout(() => setShowBanner(false), 12000); // auto-hide after 12 seconds
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("✅ User accepted the install prompt");
      } else {
        console.log("❌ User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };

  const dismissBanner = () => setShowBanner(false);

  if (!showBanner) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white p-4 rounded-b-2xl shadow-md flex flex-col sm:flex-row items-center justify-between transition-transform duration-500 ease-in-out ${
        animate ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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
