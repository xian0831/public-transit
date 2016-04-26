/**
 * Created by andrew on 4/14/16.
 */
(function(){
    'use strict';

    angular
        .module('transit-app')
        .factory('trainResourceService',trainResourceService);

    trainResourceService.$inject = ['WMATA_API_KEY','$http'];

    function trainResourceService(WMATA_API_KEY,$http) {
        var resource;

        resource = {
            stops : stops
        };

        function stops() {
            return  $http({
                method: 'GET',
                url: 'https://api.wmata.com/Rail.svc/json/jStations?LineCode=RD',
                headers: {'api_key': 'b8d72d4443d84c0a9acc8c6e4481a3b9'}
            });


        }

        return resource;
    }
})();