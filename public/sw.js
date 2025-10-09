/* ============================================================
   Service Worker – Precision & Pulse (Sprint 2.3)
   ------------------------------------------------------------
   Cache statische assets voor offline gebruik.
   ============================================================ */

const CACHE_NAME = "temio-cache-v3";
const OFFLINE_URL = "/offline.html";

const PRECACHE_URLS = [
  "/",
  "/index.html",
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Install: precache basisbestanden
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

// Activate: verwijder oude caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
});

// Fetch: netwerk eerst, fallback naar cache, dan offlinepagina
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return resp;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match(OFFLINE_URL))
      )
  );
});
