const CACHE_NAME = "ithuta-cache-v1";

// List of core assets to cache
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
  "/offline.html" // Optional: a fallback offline page
];

// Install event – caching app shell
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching app shell");
      return cache.addAll(urlsToCache);
    })
  );

  // Force activation after install
  self.skipWaiting();
});

// Activate event – cleanup old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );

  // Claim clients immediately
  self.clients.claim();
});

// Fetch event – cache-first strategy
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return; // Only cache GET requests

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          // Optional: cache new requests
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          // Optional: show offline fallback page
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        }); 
    })
  );
});
