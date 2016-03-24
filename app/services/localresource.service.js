/**
 * Created by andrew on 3/17/16.
 */
(function(){
    'use strict';

    angular
        .module('transit-app')
        .factory('localResourceService',localResourceService);

    localResourceService.$inject = ['$http'];

    function localResourceService($http) {
        var resource;
        resource = {
            agency: agency,
            stop: stop
        };

        function agency() {
            return $http.get('data/agency.json');
        }

        function stop() {
            return $http.get('data/stops.txt');
        }

        return resource;
    }
})();