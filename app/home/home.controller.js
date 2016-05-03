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

        self.getSchedule = function() {
            var date = new Date();
            var currentTime = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            self.schedules = findValidTrip(self.originationId, self.destinationId).filter(function(trip){
                return (trip.origTime >= currentTime && trip.origTime < '24:00:00');
            });

        };

        localResourceService.stops().then(function(response){
            return Papa.parse(response.data,{
                delimiter: ',',
                header: true
            }).data;

        }).then(function(data){
            self.stops = data;
        });

        localResourceService.stopTimes().then(function(response){
            return Papa.parse(response.data,{
                delimiter: ',',
                header: true
            }).data;

        }).then(function(data){
            self.stopTimes = data;
            $log.log(self.stopTimes);
        });

        var findValidTrip = function (origId, distId) {
            var validTrips = [];
            var tripId;
            var origSeq;
            var origTime;

            for(var i = 0, length = self.stopTimes.length; i < length; i++){
                if(origId === self.stopTimes[i].stop_id) {
                    tripId = self.stopTimes[i].trip_id;
                    origSeq = self.stopTimes[i].stop_sequence;
                    origTime = self.stopTimes[i].arrival_time;
                } else if (distId === self.stopTimes[i].stop_id) {
                    if (tripId === self.stopTimes[i].trip_id && origSeq < self.stopTimes[i].stop_sequence) {
                        validTrips.push({
                            tripId : tripId,
                            origTime: origTime,
                            distTime: self.stopTimes[i].arrival_time,
                            duration: getTimeDiff(origTime,self.stopTimes[i].arrival_time)

                        });
                        console.log(tripId + ' ' + origSeq + ' ' + self.stopTimes[i].stop_sequence);
                    }
                }

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