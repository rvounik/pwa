// note: leave this file in root of project or scope will be limited
var doCache = false;

// Name our cache
var CACHE_NAME = 'rvo-pwa';

// delete old cache
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then(keyList =>
                Promise.all(keyList.map(key => {
                    if (
                        !cacheWhitelist.includes(key)
                    ) {
                        console.log('Deleting cache: ' + key);
                        return caches.delete(key);
                    }
                }))
            )
    );
});

// install is triggered on first launch
self.addEventListener('install', function (event) {
    // installing service worker
    if (doCache) {
        // if caching is enabled, cache the specified files for offline usage (the first "/" indicates www.rvo-pwa.nl/)
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(function (cache) {
                    const urlsToCache = [
                        "/",
                        "index.html",
                        "cached.html",
                        "questionnaire.html",
                        "web/assets/image/logo-ltp-rgb.svg",
                        "web/css/screen.css",
                        "web/js/vendor/polyfill.js",
                        "web/js/questionnaire.js",
                        "web/js/common.js"
                    ];
                    cache.addAll(urlsToCache);
                    console.log('ServiceWorker cached the following files: ' + urlsToCache);
                })
        );
    } else {
        console.log('ServiceWorker caching is disabled');
    }
});

// intercept any request and serve cached version of the file if available (regardless of online/offline state)
self.addEventListener('fetch', function (event) {
    if (doCache) {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});
