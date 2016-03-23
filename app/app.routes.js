(function() {
    'use strict';

    angular
        .module('transit-app')
        .config(config);

    config.$inject = ['$stateProvider','$urlRouterProvider'];

    function config ($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/home');

        $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'app/partials/home/home.html'
        })

        .state('about', {
        });

    }
})();