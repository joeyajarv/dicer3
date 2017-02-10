var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [
    './images/apple-icon-57x57.png',
    './images/apple-icon-60x60.png',
    './images/apple-icon-72x72.png',
    './images/apple-icon-76x76.png',
    './images/apple-icon-120x120.png',
    './images/apple-icon-144x414.png',
    './images/apple-icon-152x152.png',
    './images/apple-icon-180x180.png',
    './images/android-icon-192x192.png',
    './images/favicon-32x32.png',
    './images/favicon-96x96.png',
    './images/favicon-16x16.png',
    './images/ms-icon-144x144.png'
];

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});