(function () {
    angular
        .module("DroneMissionAnalyzer")
        .controller("mapsController", mapsController);

    function mapsController(MissionService, $routeParams, $interval) {
      var vm = this;
//key= AIzaSyA-ZohFkSUCflhvo63mWeHaup64mltv7Go

      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: 40.74, lng: -74.18},
          mapTypeId: 'terrain'
      });

     /* var map1 = new google.maps.Map(document.getElementById('map1'), {
        zoom: 10,
        center: {lat: 40.74, lng: -74.18},
        mapTypeId: 'terrain'
    });*/

        /*var polygons = [];

      var coordinates = {
          "mission_plan": [
              {lat: 40.71, lng: -74.21},
              {lat: 40.77, lng: -74.15},
              {lat: 40.77, lng: -74.00},
              {lat: 40.71, lng: -74.21}
          ],
          "mission_data": [
              {lat: 40.71, lng: -74.21},
              {lat: 40.77, lng: -74.15},
              {lat: 40.77, lng: -74.00},
              {lat: 40.71, lng: -74.21}
          ]

      };

      /!*var flightPlanCoordinates =[
        {lat: 40.71, lng: -74.21},
        {lat: 40.77, lng:-74.15},
        {lat: 40.77, lng:-74.00},
        {lat: 40.71, lng: -74.21},
      ];*!/

      for(var i in coordinates) {
        arr =[];

        for(var j=0;j < coordinates[i].length;j++) {
          arr.push(new google.maps.LatLng(
              coordinates[i][j][0],
              coordinates[i][j][1]
          ));

        }

        polygons.push(new google.maps.Polyline({
            path: arr,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        }));
        polygons[polygons.length-1].setMap(map);
      }

      
      /!*var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      var flightPath1 = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: 'blue',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      flightPath.setMap(map);
      flightPath1.setMap(map1);*!/*/

    }
})();
