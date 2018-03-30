(function () {
    angular
        .module("DroneMissionAnalyzer")
        .controller("DownloadController", downloadController);

    function downloadController(PlanService, $routeParams) {
        let vm = this;
        let objPrefix = "https://s3.amazonaws.com/";
        vm.userID = $routeParams['uid'];

        vm.plans = [];
        vm.download = download;

        function init() {
            PlanService.getAllPlansByUser(vm.userID)
                .then(function (response) {
                    let data = response.data;
                    let bucketName = data.Name;
                    let objects = data.Contents;

                    objects.forEach((obj) => {
                        let mapping = {
                            key: obj.Key,
                            url: objPrefix + bucketName + "/" + obj.Key
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