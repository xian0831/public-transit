///**
// * Created by andrew on 3/15/16.
// */
//'use strict';
//
//this.addEventListener('install', function(event) {
//    event.waitUntil(
//        caches.open('v1').then(function(cache) {
//            return cache.addAll([
//                '/',
//                '/index.html',
//                '/data/agency.json'
//
//            ]);
//        })
//    );
//});
//
//this.addEventListener('fetch', function(event) {
//    event.respondWith(
//        caches.match(event.request).catch(function() {
//            return fetch(event.request);
//        })
//    );
//});