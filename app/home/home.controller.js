/**
 * Created by andrew on 3/23/16.
 */
(function() {
    'use strict';

    angular
        .module('transit-app')
        .controller('HomeController',HomeController);

    HomeController.$inject = ['$log','localResourceService'];

    function HomeController($log, localResourceService) {

        var self = this;

        self.name = 'a';

        localResourceService.stop().then(function(response){
            return Papa.parse(response.data,{
                delimiter: ',',
                header: true
            }).data;

        }).then(function(data){
            self.stops = data;
            $log.log(self.stops);
        });
    }

})();