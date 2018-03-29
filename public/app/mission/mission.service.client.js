(function () {
    angular
        .module("DroneMissionAnalyzer")
        .factory('MissionService', missionService);

    function missionService($http) {
        return {
            "validateMission": validateMission
        };

        function validateMission(userID) {
            return $http.get("/user/" + userID + "/mission");
        }
    }
})();
