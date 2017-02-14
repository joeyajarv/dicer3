'use strict';

const CACHE_NAME = "1.00";
let cacheFiles = [
    './index.html',
    './foundation.min.css',
    './style.css',
    './main.js',
    './app.js',
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

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter((key) => {
                        return !key.startsWith(CACHE_NAME);
                    })
                    .map((key) => {
                        return caches.delete(key);
                    })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((res) => {
            if (res) {
                return res;
            }
            let requestClone = event.request.clone();
            fetch(requestClone).then((res) => {
                if (!res) {
                    return res;
                }
                let responseClone = res.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                    return res;
                });
            })
        })
    );
});