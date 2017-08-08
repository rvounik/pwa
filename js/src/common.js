/* performs feature query for navigator, then initialises service worker */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
            // console.log('ServiceWorker registration successful with scope: ', registration.scope);
            // note: if storage was NOT cleared (or caching=false), service worker install event wont be triggered
        }, function (err) {
            // registration failed
            console.log('ServiceWorker registration failed: ', err);
        }).catch(function (err) {
            console.log(err);
        });
    });

    window.addEventListener('online', function(e) {
        document.querySelector('body').classList.remove('offline');
    }, false);

    window.addEventListener('offline', function(e) {
        document.querySelector('body').classList.add('offline');
    }, false);
} else {
    alert('serviceWorker not supported on this device, cant work offline');
}
