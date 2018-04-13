let validateMission = (req, res) => {
    let imageMetaData = req.body.imageMetaData;
    let planData = req.body.planData;
    let nearestPoints = [];

    for (let j = 0; j < planData.length; j++) {
        nearestPoints[j] = 0;
        for (let i = 1; i < imageMetaData.length; i++) {
            if (isClose(planData[j], imageMetaData[i], imageMetaData[nearestPoints[j]])) {
                nearestPoints[j] = i;
            }
        }
    }

    let missedWayPoints = getMissedWaypoints(planData, imageMetaData, nearestPoints);
    if (missedWayPoints.length === 0) {
        res.status(200).send({"Status": "Mission Pass!"});
    }
    else {
        res.status(501).send({
            "Status": "Mission Fail!",
            "MissedwayPoints": missedWayPoints,
            "MissionPlan": planData
        });
    }
};

let isClose = (data, newMetaData, oldMetaData) => {
    let d1 = calculateDistance(data, newMetaData);
    let d2 = calculateDistance(data, oldMetaData);

    if (d1 < d2) {
        return true;
    }
    else if (d1 === d2) {
        let altD1 = calculateAltitudeDifference(data.altitude, newMetaData.altitude);
        let altD2 = calculateAltitudeDifference(data.altitude, oldMetaData.altitude);
        if (altD1 < altD2) {
            return true;
        }
        else if (altD1 === altD2) {
            let headingD1 = calculateHeadingDifference(data.heading, newMetaData.heading);
            let headingD2 = calculateHeadingDifference(data.heading, oldMetaData.heading);
            if (headingD1 < headingD2) {
                return true;
            }
            else if (headingD1 === headingD2) {
                let gimbalPitchAngleD1 = calculateGimbalPitchAngleDifference(data.gimbalPitchAngle, newMetaData.gimbalPitchAngle);
                let gimbalPitchAngleD2 = calculateGimbalPitchAngleDifference(data.gimbalPitchAngle, oldMetaData.gimbalPitchAngle);

                if (gimbalPitchAngleD1 < gimbalPitchAngleD2) {
                    return true;
                }
            }
        }
    }
    return false;
};

let calculateGimbalPitchAngleDifference = (gimbalPitch1, gimbalPitch2) => {
    return Math.abs(gimbalPitch1 - gimbalPitch2);
};

let calculateHeadingDifference = (heading1, heading2) => {
    return Math.abs(heading1 - heading2);
};

let calculateAltitudeDifference = (alt1, alt2) => {
    return Math.abs(alt1 - alt2);
};

let degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
};

let calculateDistance = (data1, data2) => {
    let lat1 = data1.latitude;
    let lat2 = data2.latitude;
    let lon1 = data1.longitude;
    let lon2 = data2.longitude;

    let R = 6371000; // metres
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
    lon1 = degreesToRadians(lon1);
    lon2 = degreesToRadians(lon2);
    let lat_delta = lat2 - lat1;
    let long_delta = lon2 - lon1;

    let a = Math.sin(lat_delta / 2) * Math.sin(lat_delta / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(long_delta / 2) * Math.sin(long_delta / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

let getMissedWaypoints = (dataArr, metaData, nearestPoints) => {
    let missedWayPoints = [];
    for (let i = 0; i < dataArr.length; i++) {
        let curMeta = metaData[nearestPoints[i]];
        let d = calculateDistance(dataArr[i], curMeta);
        d = (d / 1000).toPrecision(4);
        d = (d > 1 ? Number(d) : d);
        //greater than 50 metres
        if (d > 0.05 || calculateAltitudeDifference(dataArr[i].altitude, curMeta.altitude) > 10 ||
            calculateHeadingDifference(dataArr[i].heading, curMeta.heading) > 10 ||
            calculateGimbalPitchAngleDifference(dataArr[i].gimbalPitchAngle, curMeta.gimbalPitchAngle) > 10) {
            missedWayPoints.push(i);
        }
    }
    return missedWayPoints;
};

export {validateMission};
