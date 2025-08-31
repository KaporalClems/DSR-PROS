const CACHE_NAME = "dsr-pros-cache-v1";
const urlsToCache = [
  "index.html",
  "home.html",
  "intervenants.html",
  "prestataires.html",
  "programme.html",
  "scanner.html",
  "checklist.html",
  "apropos.html",
  "assets/style.css",
  "assets/app.js"
];

// Installation
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Récupération
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
