/**
 * Created by andrew on 3/23/16.
 */
(function() {
    'use strict';

    angular
        .module('transit-app')
        .controller('HomeController',HomeController);

    HomeController.$inject = ['$log','localResourceService','$scope'];

    function HomeController($log, localResourceService, $scope) {

        $scope.validRoute = true;

        $scope.getSchedule = function() {
            var date = new Date();
            var currentTime = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            $scope.schedules = findValidTrip($scope.originationId, $scope.destinationId).filter(function(trip){
                return (trip.origTime >= currentTime && trip.origTime < '24:00:00');
            });
            $log.log($scope.schedules);

        };



        localResourceService.stops().then(function(response){
            return Papa.parse(response.data,{
                delimiter: ',',
                header: true
            }).data;

        }).then(function(data){
            $scope.stops = data;
        });

        localResourceService.stopTimes().then(function(response){
            return Papa.parse(response.data,{
                delimiter: ',',
                header: true
            }).data;

        }).then(function(data){
            $scope.stopTimes = data;
            $log.log($scope.stopTimes);
        });

        var findValidTrip = function (origId, distId) {
            var validTrips = [];
            var tripId;
            var origSeq;
            var origTime;

            for(var i = 0, length = $scope.stopTimes.length; i < length; i++){
                if(origId === $scope.stopTimes[i].stop_id) {
                    tripId = $scope.stopTimes[i].trip_id;
                    origSeq = $scope.stopTimes[i].stop_sequence;
                    origTime = $scope.stopTimes[i].arrival_time;
                } else if (distId === $scope.stopTimes[i].stop_id) {
                    if (tripId === $scope.stopTimes[i].trip_id && origSeq < $scope.stopTimes[i].stop_sequence) {
                        validTrips.push({
                            tripId : tripId,
                            origTime: origTime,
                            distTime: $scope.stopTimes[i].arrival_time,
                            duration: getTimeDiff(origTime,$scope.stopTimes[i].arrival_time)

                        });

                    }
                }

            }
            if(validTrips.length === 0) {
                $scope.validRoute = false;
                console.log('The destination is not reachable from the origination.');
            } else {
                $scope.validRoute = true;
            }
            return validTrips;
        };

        //To be completed
        var getTimeDiff = function (startTime, endTime) {
            var startTimestamp = startTime.split(':');
            var endTimestamp = endTime.split(':');

            return ((+endTimestamp[0])*60 + (+endTimestamp[1])) - ((+startTimestamp[0])*60 + (+startTimestamp[1]));
        };



    }

})();