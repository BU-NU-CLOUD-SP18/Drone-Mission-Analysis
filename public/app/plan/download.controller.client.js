(function () {
    angular
        .module("DroneMissionAnalyzer")
        .controller("DownloadController", downloadController);

    function downloadController(PlanService, $routeParams) {
        let vm = this;
        vm.userID = $routeParams['uid'];

        vm.download = download;

        function init() {
            PlanService.getAllPlansByUser(vm.userID)
                .then(function (response) {
                    vm.plans = response.data;
                }, function (err) {
                    vm.error = err.data.message;
                    console.log(err);
                });
        }

        init();

        function download() {
            // fetch logic
        }
    }
})();