// note: leave this file in root of project or scope will be limited

// enable caching when deployed (not during development since you wont see your changes after initial load)
var doCache = false;

// Name our cache
var CACHE_NAME = 'rvo-pwa';

// Delete old caches that are not our current one!
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

// todo: combine the JS files into one
// note that the first "/" in the list ensures the project's default document (ie: rvo-pwa.nl with nothing after) is cached, too
/* install is triggered on first launch */
self.addEventListener('install', function (event) {
    // installing service worker
    if (doCache) {
        /* if caching is enabled, open cache and cache the specified files for offline usage */
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(function (cache) {
                    const urlsToCache = [
                        "/",
                        "index.html",
                        "cached.html",
                        "questionnaire.html",
                        "web/css/screen.css",
                        "web/js/common.js",
                        "web/js/vendor/polyfill.js"
                    ];
                    cache.addAll(urlsToCache);
                    console.log('ServiceWorker cached the following files: ' + urlsToCache);
                })
        );
    } else {
        console.log('ServiceWorker caching is disabled');
    }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching cached files if we have them (regardless of online/offline state)
self.addEventListener('fetch', function (event) {
    if (doCache) {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});
