(function () {
    angular
        .module("DroneMissionAnalyzer")
        .controller("ValidateController", validateController);

    function validateController(MissionService, $routeParams) {
        let vm = this;
        vm.userID = $routeParams['uid'];
        vm.files = [];
        //vm.validate = validate;

        function init() {

        }

        vm.uploadFiles = function (files, i) {
            vm.files[i] = files;
            if (files && files.length) {
                console.log(files);
            }
        };

        vm.submit = function () {
            let files = vm.files;
            if (files && files.length) {
              metaData = generateMetaData(files);
              console.log(metaData);
            }
        };


        init();
        function generateMetaData(files) {
          let metaData = []
          files.forEach(async (file) => {
          //for(i = 0; i< files.length;i++) {
              await EXIF.getData(file, function() {
              var lat = EXIF.getAllTags(this);
              metaData.push({'lat':lat});

            })
          });
          //}
          return metaData;
        }

        function getMetaData(file) {
          EXIF.getData(file, function() {
            var lat = (EXIF.getTag(this, "GPSLatitude") + "").split(",");
            var long = (EXIF.getTag(this, "GPSLongitude") + "").split(",");
            var alt = (EXIF.getTag(this, "GPSAltitude") + "");
            return {lat, long, alt};
          })
        }
        function mission() {
            // validate image data against mission
        }
    }
})();
