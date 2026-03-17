const CACHE_NAME = "rainpred-cache-v1";
const urlsToCache = [
  "index.html",
  "model.onnx"
];

// Install service worker and cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch handler: serve cached files if offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});