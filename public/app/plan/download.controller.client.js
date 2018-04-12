(function () {
    angular
        .module("DroneMissionAnalyzer")
        .controller("DownloadController", downloadController);

    function downloadController(PlanService, $routeParams) {
        let vm = this;
        vm.userID = $routeParams['uid'];

        vm.plans = [];
        vm.download = download;

        function init() {
            PlanService.getAllPlansByUser(vm.userID)
                .then(function (response) {
                    let data = response.data;
                    let objects = data.Contents;

                    objects.forEach((obj) => {
                        let split = obj.Key.split("/");
                        let planName = split[split.length - 1];
                        let mapping = {
                            key: planName,
                            url: obj.preSignedURL
                        };
                        vm.plans.push(mapping);
                    });
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