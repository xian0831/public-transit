///**
// * Created by andrew on 3/15/16.
// */
'use strict';

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('my-transit-cache-v2').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                'assets/vendor/js/angular.js',
                'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.18/angular-ui-router.js',
                'assets/js/all.min.js',
                '//code.jquery.com/jquery-1.12.0.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.2/papaparse.min.js',
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
                'app/partials/home/home.html',
                'data/rail_stops.txt',
                'data/rail_stop_time.txt'

            ]);
        })
    );
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                    // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});