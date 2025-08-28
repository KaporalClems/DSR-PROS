const CACHE_NAME = 'dsr-pros-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/prestataires.html',
  '/intervenants.html',
  '/scanner.html',
  '/checkin.html',
  '/admin.html',
  '/about.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/html5-qrcode@2.0.9/dist/html5-qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.gstatic.com',
  'https://frt.re/wp-content/uploads/2022/05/logo-DSR.png'
];

// Installation du Service Worker et mise en cache des fichiers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interception des requêtes pour les servir depuis le cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Réponse depuis le cache si elle existe
        if (response) {
          return response;
        }
        // Sinon, chercher sur le réseau
        return fetch(event.request);
      })
  );
});

// Gestion de la mise à jour du cache
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
