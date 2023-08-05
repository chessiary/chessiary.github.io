self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll([
        '',
        'index.html',
        'styles.css',
        'script.js',
        'offline.html',
        'chessiary.ico',
        'no-wifi.png',
        // Add other resources to cache
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});