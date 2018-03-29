(function () {
    angular
        .module("DroneMissionAnalyzer")
        .controller("ValidateController", validateController);

    function validateController(MissionService, $routeParams) {
        let vm = this;
        vm.userID = $routeParams['uid'];

        vm.validate = validate;

        function init() {
            // some logic may be
        }

        init();

        function mission() {
            // validate image data against mission
        }
    }
})();