/* performs feature query for navigator, then initialises service worker */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
            // Registration was successful

            // var newWorker = registration.installing;
            //
            // // statechange fires every time the ServiceWorker.state changes
            // newWorker.onstatechange = function() {
            //     // show the message on activation
            //     if (newWorker.state == 'activated' && !navigator.serviceWorker.controller) {
            //         document.querySelector('body').classList.add('offline');
            //     }
            // }

            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            console.log('note: if storage was NOT cleared (or caching=false), service worker install event wont be triggered and you wont see information on cached files below this line:');
        }, function (err) {
            // registration failed
            console.log('ServiceWorker registration failed: ', err);
        }).catch(function (err) {
            console.log(err);
        });

        console.log('checking navigator status',navigator);
        if (!navigator.onLine) {
            document.querySelector('body').classList.add('offline');
        }
    });
} else {
    // todo: ensure this only fires when app is really offline
    alert('service worker not supported on this device, cant work offline');
}
