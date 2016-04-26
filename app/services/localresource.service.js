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
            stops: stops
        };

        function agency() {
            return $http.get('data/agency.json');
        }

        function stops() {
            return $http.get('data/rail_stops.txt');
        }

        return resource;
    }
})();