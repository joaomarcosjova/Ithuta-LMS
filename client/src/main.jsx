import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { registerSW } from 'virtual:pwa-register';

import InstallPrompt from './components/student/InstallPrompt';



// Register the service worker (auto-updates)
registerSW({ immediate: true });

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AppContextProvider>
		<InstallPrompt/>
        <App />
      </AppContextProvider>
    </ClerkProvider>
  </BrowserRouter>
);
