(function () {
    angular
        .module("DroneMissionAnalyzer")
        .controller("ValidateController", validateController);

    function validateController(MissionService, $routeParams) {
        let vm = this;
        vm.userID = $routeParams['uid'];
        vm.images = [];
        vm.planData = [];
        vm.plan = [];
        vm.metaData = [];

        vm.uploadImages = function (files) {
            vm.images = files.slice();

            if (vm.images && vm.images.length) {
                console.log(vm.images);

                vm.metaData = generateMetaData(vm.images);
                console.log("Metadata: " + vm.metaData);
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

        vm.validate = function () {
            let missionData = {
                imageMetaData: vm.metaData,
                planData: vm.planData
            };
            MissionService.validateMission(vm.userID, missionData)
                .then(function (response) {
                    vm.success = response.data.Status;
                }, function (err) {
                    vm.error = err.data.Status;
                    console.log(err);
                })
        };

        /*
                metadata.push({"latitude": 42.33966264, "longitude": -71.09559111, "altitude": 30});
                metadata.push({"latitude": 42.34041702, "longitude": -71.09353563, "altitude": 30});
                metadata.push({"latitude": 42.33961765, "longitude": -71.0929484, "altitude": 30});
                metadata.push({"latitude": 42.339007, "longitude": -71.09336146, "altitude": 30});
                metadata.push({"latitude": 42.33872151, "longitude": -71.09411785, "altitude": 30});
                metadata.push({"latitude": 42.33908631, "longitude": -71.09517464, "altitude": 30});
        */

        function generateMetaData(files) {
            let metadata = [];
            files.forEach(async (file) => {
                EXIF.enableXmp();
                await EXIF.getData(file, function () {
                    let xmpData = file.xmpdata['x:xmpmeta']['rdf:RDF']['rdf:Description']['@attributes'];
                    let lat = (EXIF.getTag(this, "GPSLatitude") + "").split(",");
                    let long = (EXIF.getTag(this, "GPSLongitude") + "").split(",");
                    let alt = (EXIF.getTag(this, "GPSAltitude") + "");

                    let latRef = EXIF.getTag(this, "GPSLatitudeRef");
                    let longRef = EXIF.getTag(this, "GPSLongitudeRef");

                    let declat = convertDMSToDD(lat[0], lat[1], lat[2], latRef);
                    let declong = convertDMSToDD(long[0], long[1], long[2], longRef);

                    metadata.push({
                        "latitude": declat,
                        "longitude": declong,
                        "altitude": alt,
                        "heading": xmpData['drone-dji:FlightYawDegree'],
                        "gimbalPitchAngle": xmpData['drone-dji:GimbalPitchDegree']
                    });
                });
            });
            return metadata;
        }


        function convertDMSToDD(degrees, minutes, seconds, direction) {
            let dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60);

            if (direction === "S" || direction === "W") {
                dd = dd * -1;
            } // Don't do anything for N or E
            return dd;
        }

    }
})();
