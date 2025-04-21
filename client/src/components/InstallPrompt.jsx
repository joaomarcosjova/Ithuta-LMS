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
        setTimeout(() => setAnimate(true), 200); // trigger animation
        // setTimeout(() => setShowBanner(false), 12000); // auto-hide after 12s
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
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

  if (!showBanner) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white px-4 py-3 flex items-center justify-between text-sm shadow-md transition-transform duration-500 ease-in-out ${
        animate ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-col">
        <span className="font-semibold text-base leading-none">Ithuta</span>
        <span className="text-xs leading-none opacity-90">Adicione ao seu dispositivo</span>
      </div>
      <button
        onClick={handleInstall}
        className="bg-white text-blue-600 text-xs font-medium px-3 py-1 rounded-lg hover:bg-blue-100 transition"
      >
        Instalar
      </button>
    </div>
  );
};

export default InstallPrompt;
