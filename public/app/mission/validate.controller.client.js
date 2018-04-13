(function () {
    angular
        .module("DroneMissionAnalyzer")
        .controller("ValidateController", validateController);

    function validateController(MissionService, $routeParams) {
        let vm = this;
        vm.userID = $routeParams['uid'];
        vm.images = [];
        vm.planData = [];
        vm.validate = validate;
        vm.plan = [];

        function validate() {
            // validate image data against mission
        }

        vm.uploadImages = function (files) {
            vm.images.push(files[0]);

            if (vm.images && vm.images.length) {
                console.log(vm.images);
            }
        };

        vm.uploadPlan = function (file) {
            vm.plan.push(file);
            if (file) {
                Papa.parse(file, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function (results) {
                        console.log("Finished:", results.data);
                        vm.planData = results.data;
                    }
                });
            }
        };

        vm.submit = function () {
            let images = vm.images;
            if (images && images.length) {
                let metaData = generateMetaData(images);
                console.log(metaData);
                let missionData = {
                    imageMetaData: metaData,
                    planData: vm.planData
                };
                MissionService.validateMission(vm.userID, missionData)
                    .then(function (response) {
                        vm.success = response.data.Status;
                    }, function (err) {
                        vm.error = err.data.Status;
                        console.log(err);
                    })
            }
        };

        function generateMetaData(files) {
            let metadata = [];
            files.forEach(async (file) => {
                await EXIF.getData(file, function () {
                    let lat = (EXIF.getTag(this, "GPSLatitude") + "").split(",");
                    let long = (EXIF.getTag(this, "GPSLongitude") + "").split(",");
                    let alt = (EXIF.getTag(this, "GPSAltitude") + "");
                    //let heading = (EXIF.getTag(this, "GPSImgDirection") + "");
                    //let pitch  = (EXIF.getTag(this, ""))
                    console.log("In or out?", lat, long, alt, heading);
                    metadata.push({"latitude": lat, "longitude": long, "altitude" : alt});
                });
            });
            /*metadata.push({"latitude": 42.33966264, "longitude": -71.09559111, "altitude": 30});
            metadata.push({"latitude": 42.34041702, "longitude": -71.09353563, "altitude": 30});
            metadata.push({"latitude": 42.33961765, "longitude": -71.0929484, "altitude": 30});
            metadata.push({"latitude": 42.339007, "longitude": -71.09336146, "altitude": 30});
            metadata.push({"latitude": 42.33872151, "longitude": -71.09411785, "altitude": 30});
            metadata.push({"latitude": 42.33908631, "longitude": -71.09517464, "altitude": 30});*/
            return metadata;
        }

    }
})();
