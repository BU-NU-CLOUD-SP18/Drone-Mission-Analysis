(function () {
    angular
        .module("DroneMissionAnalyzer")
        .controller("mapsController", mapsController);

    function mapsController(MissionService, $routeParams, $interval, $rootScope) {
      var vm = this;
        console.log("Plan" + $rootScope.planData);
        console.log("Data" + $rootScope.imageMetaData);
        console.log("Missed" + $rootScope.missedWayPoints);
        var coordinates = {
            "mission_plan" : $rootScope.planData,
            "mission_data" : $rootScope.imageMetaData
        }
//key= AIzaSyA-ZohFkSUCflhvo63mWeHaup64mltv7Go

      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: parseFloat(coordinates["mission_plan"][0]["latitude"]), lng: parseFloat(coordinates["mission_plan"][0]["longitude"])},
          mapTypeId: 'terrain'
      });

     /* var map1 = new google.maps.Map(document.getElementById('map1'), {
        zoom: 10,
        center: {lat: 40.74, lng: -74.18},
        mapTypeId: 'terrain'
    });*/

     var polygons = [];

      /*var coordinates = {
          "mission_plan": [
              {lat: 40.71, lng: -74.21},
              {lat: 42.77, lng: -74.15},
              {lat: 45.77, lng: -74.00},
              {lat: 48.71, lng: -74.21}
          ],
          "mission_data": [
              {lat: 50.71, lng: -74.21},
              {lat: 51.77, lng: -74.15},
              {lat: 52.77, lng: -74.00},
              {lat: 58.71, lng: -74.21}
          ]

      };*/



        var markers = [];

      for(var i in coordinates) {
        arr =[];
          var lineColor = "";
          var color = "";
          if(i == "mission_plan") {
              lineColor = "blue";
          }
          else {
              lineColor = "red";
              color = "yellow";
          }
        for(var j=0;j < coordinates[i].length;j++) {
            var position = new google.maps.LatLng(
                coordinates[i][j]["latitude"],
                coordinates[i][j]["longitude"]);
            if(i == "mission_plan") {
                if($rootScope.missedWayPoints != null && $rootScope.missedWayPoints.indexOf(j) > -1) {
                    color = "red";
                }
                else {
                    color = "blue";
                }
            }
            var marker = new google.maps.Marker({
                position: position,
                icon: 'http://maps.google.com/mapfiles/ms/icons/'+color+'.png',
                map: map
            });
          arr.push(position);
        }

        //console.log(arr);
        polygons.push(new google.maps.Polyline({
            path: arr,
            strokeColor: lineColor,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: lineColor,
            fillOpacity: 0.35
        }));
        polygons[polygons.length-1].setMap(map);
      }

    }
})();
