'use strict';

(function () {
    'use strict';

    angular.module('transit-app', ['ui.router']);

    angular.module('transit-app').constant('WMATA_API_KEY', 'b8d72d4443d84c0a9acc8c6e4481a3b9');
})();
'use strict';

(function () {
    'use strict';

    angular.module('transit-app').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'app/partials/home/home.html',
            controller: 'HomeController'
        }).state('about', {});
    }
})();
'use strict';

/**
 * Created by andrew on 3/23/16.
 */
(function () {
    'use strict';

    angular.module('transit-app').controller('HomeController', HomeController);

    HomeController.$inject = ['$log', 'localResourceService', '$scope'];

    function HomeController($log, localResourceService, $scope) {

        $scope.validRoute = true;

        $scope.getSchedule = function () {
            var date = new Date();
            var currentTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            $scope.schedules = findValidTrip($scope.originationId, $scope.destinationId).filter(function (trip) {
                return trip.origTime >= currentTime && trip.origTime < '24:00:00';
            });
            $log.log($scope.schedules);
        };

        localResourceService.stops().then(function (response) {
            return Papa.parse(response.data, {
                delimiter: ',',
                header: true
            }).data;
        }).then(function (data) {
            $scope.stops = data;
        });

        localResourceService.stopTimes().then(function (response) {
            return Papa.parse(response.data, {
                delimiter: ',',
                header: true
            }).data;
        }).then(function (data) {
            $scope.stopTimes = data;
            $log.log($scope.stopTimes);
        });

        var findValidTrip = function findValidTrip(origId, distId) {
            var validTrips = [];
            var tripId;
            var origSeq;
            var origTime;

            for (var i = 0, length = $scope.stopTimes.length; i < length; i++) {
                if (origId === $scope.stopTimes[i].stop_id) {
                    tripId = $scope.stopTimes[i].trip_id;
                    origSeq = $scope.stopTimes[i].stop_sequence;
                    origTime = $scope.stopTimes[i].arrival_time;
                } else if (distId === $scope.stopTimes[i].stop_id) {
                    if (tripId === $scope.stopTimes[i].trip_id && origSeq < $scope.stopTimes[i].stop_sequence) {
                        validTrips.push({
                            tripId: tripId,
                            origTime: origTime,
                            distTime: $scope.stopTimes[i].arrival_time,
                            duration: getTimeDiff(origTime, $scope.stopTimes[i].arrival_time)

                        });
                    }
                }
            }
            if (validTrips.length === 0) {
                $scope.validRoute = false;
                console.log('The destination is not reachable from the origination.');
            } else {
                $scope.validRoute = true;
            }
            return validTrips;
        };

        //To be completed
        var getTimeDiff = function getTimeDiff(startTime, endTime) {
            var startTimestamp = startTime.split(':');
            var endTimestamp = endTime.split(':');

            return +endTimestamp[0] * 60 + +endTimestamp[1] - (+startTimestamp[0] * 60 + +startTimestamp[1]);
        };
    }
})();
'use strict';

/**
 * Created by andrew on 3/17/16.
 */
(function () {
    'use strict';

    angular.module('transit-app').factory('localResourceService', localResourceService);

    localResourceService.$inject = ['$http'];

    function localResourceService($http) {
        var resource;
        resource = {
            agency: agency,
            stops: stops,
            stopTimes: stopTimes
        };

        function agency() {
            return $http.get('data/agency.json');
        }

        function stops() {
            return $http.get('data/rail_stops.txt');
        }

        function stopTimes() {
            return $http.get('data/rail_stop_time.txt');
        }

        return resource;
    }
})();
'use strict';

/**
 * Created by andrew on 4/14/16.
 */
(function () {
    'use strict';

    angular.module('transit-app').factory('trainResourceService', trainResourceService);

    trainResourceService.$inject = ['WMATA_API_KEY', '$http'];

    function trainResourceService(WMATA_API_KEY, $http) {
        var resource;

        resource = {
            stops: stops
        };

        function stops() {
            return $http({
                method: 'GET',
                url: 'https://api.wmata.com/Rail.svc/json/jStations?LineCode=RD',
                headers: { 'api_key': 'b8d72d4443d84c0a9acc8c6e4481a3b9' }
            });
        }

        return resource;
    }
})();
'use strict';

/**
 * Created by andrew on 3/15/16.
 */
(function () {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (reg) {
            // registration worked
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function (error) {
            // registration failed
            console.log('Registration failed with ' + error);
        });
    }
})();