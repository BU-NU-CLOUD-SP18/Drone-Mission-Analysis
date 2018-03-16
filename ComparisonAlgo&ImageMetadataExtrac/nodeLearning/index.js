var express = require('express');
var app = express();
var fs = require("fs");
var multer  = require('multer');
var bodyParser = require('body-parser');
var parser = require('exif-parser');
var csv = require('fast-csv');
var http = require("http");

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
var upload = multer({ dest: './uploads' });

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "file_upload.html" );
})

function isClose(data, newMetaData, oldMetaData) {
  var d1 = calculateDistance(data, newMetaData);
  //d = (d1/1000).toPrecision(4);
  //console.log(d);
  //console.log(d>1 ? Number(d): d);

  var d2 = calculateDistance(data, oldMetaData);
  //console.log(d2);
  if(d1 < d2) {
    return true;
  }
  else if(d1 == d2) {
    var altD1 = calculateAltitudeDifference(data.altitude, newMetaData.altitude);
    var altD2 = calculateAltitudeDifference(data.altitude, oldMetaData.altitude);
    if(altD1 < altD2) {
      return true;
    }
  }
  return false;
}

function calculateAltitudeDifference(alt1, alt2) {

  return Math.abs(alt1 - alt2);
}
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}
function calculateDistance(data1, data2) {

//  console.log(data1);
  //console.log(data2);
  var lat1 = data1.latitude;
  var lat2 = data2.latitude;
  var lon1 = data1.longitude;
  var lon2 = data2.longitude;
  var alt1 = data1.altitude;
  var alt2 = data2.altitude;
  var R = 6371000; // metres
  var φ1 = degreesToRadians(lat1);
  //console.log("fi 1 :" + φ1);
  var φ2 = degreesToRadians(lat2);
  //console.log("fi 2 :" + φ2);
  var λ1 = degreesToRadians(lon1);
  //console.log("lamda 1 :" + λ1);
  var λ2 = degreesToRadians(lon2);
  //console.log("lamda 1 :" + λ2);
  var Δφ = φ2-φ1;
  //console.log("Δφ :" + Δφ);
  var Δλ = λ2-λ1;
  //console.log("Δλ :" + Δλ);
//  var lat_1 = R * Math.sin(λ1) * Math.sin(φ1);
  //var long_1 = R * Math.sin(λ1) * Math.sin(φ1);
  //var alt_1 =R * Math.sin(λ1) * Math.sin(φ1);

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  //console.log("a: " + a);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //console.log("c :" + c);

  var d = R * c;
  //console.log("d :" + d);
  return d;
}

function getMissedWaypoints(dataArr, metaData, nearestPoints) {

  //console.log(dataArr);
  //console.log(metaData);
  var missedWayPoints = new Array();
  for(var i = 0;i<dataArr.length;i++) {
    var curMeta = metaData[nearestPoints[i]];
    console.log("{" + dataArr[i].latitude + ", " + dataArr[i].longitude);
    console.log(curMeta);
    var d = calculateDistance(dataArr[i], curMeta);
    //d = d * 1000;

    d = (d/1000).toPrecision(4);
    d = (d>1 ? Number(d): d);
      console.log(d);
    //console.log(d);
    if( d > 0.05 || calculateAltitudeDifference(dataArr[i].altitude, curMeta.altitude) > 10) { //greater than 50 metres
      console.log(d);
      missedWayPoints.push(i);
    }
  }
  return missedWayPoints;
}
app.post('/file_upload', function(req, res){

  var metaData = JSON.parse(req.body.d);

  console.log(metaData[0]);
  var file = __dirname + "/" + "public/MissionData" + "/" + "BFA.csv";
  var stream = fs.createReadStream(file)
  var dataArr = []
  csv.fromStream(stream, {headers: true})
  .on("data", function(data){
    dataArr.push(data)
  })
  .on("end", function() {
    var file = __dirname + "/" + "public/MissionData" + "/" + "BFA_wrong.csv";
    var metaData = [];
    var stream = fs.createReadStream(file)
    csv.fromStream(stream, {headers: true})
    .on("data", function(data){
      metaData.push(data)
    })
    .on("end", function() {
    //res.send(dataArr)
    var closest = 0;
    var nearestPoints = new Array();
    //console.log(isClose(dataArr[0], metaData[0], metaData[0]));
    for(var j = 0; j<dataArr.length;j++) {
      nearestPoints[j] = 0;
      for(var i = 1; i<metaData.length;i++) {

        if(isClose(dataArr[j], metaData[i], metaData[nearestPoints[j]])) {
          nearestPoints[j] = i;
        }
      }
    }
    var missedWayPoints = getMissedWaypoints(dataArr, metaData, nearestPoints)
    if(missedWayPoints.length == 0) {
      //var jso  = JSON.stringify({})
      res.send({'Status': "Pass"});
    }
    else {
      res.send({'Status': "Fail", 'MissedwayPoints' : missedWayPoints, 'MissionPlan': dataArr});
    }
  })
})

   /*console.log(req.file);
   var buf = fs.readFileSync(req.file.path);
   parser = parser.create(buf)
   parser.enablePointers(true)

   var result = parser.parse()
  // var file = __dirname + "/" + req.files.file.name;
   //console.log(file);
var tags = result.tags;

 // decode raw exif data from a buffer
 //var metadata = exif(buf);
 res.send("<html><body><table border = '2'><tr><th>Data</th><th>Value</th></tr><tr><td>Latitide</td><td>" + tags.GPSLatitude + "</td>" +
 "</tr><tr><td>Longitude</td><td>" + tags.GPSLongitude + "</td></tr><tr><td>Altitude</td><td>" + tags.GPSAltitude + "</td></tr></table></body></html");*/
 /*var stream = fs.createReadStream(req.file.path);
 var dataArr = [];
 csv.fromStream(stream, {headers: true})
 .on("data", function(data) {
   dataArr.push(data);
   //res.send(data);
 })
 .on("end", function() {
   res.send(dataArr);
 })*/

})



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   //console.log(getMissedWaypoints([{'latitude': 41.4932810846479, 'longitude': -71.1385479569435}],
   //[{'latitude': 41.4932810846479, 'longitude': -72.1385479569435}], [0]));
   console.log("Example app listening at http://%s:%s", host, port)
})
