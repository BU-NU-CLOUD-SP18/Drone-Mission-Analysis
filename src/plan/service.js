// Load the SDK for JavaScript
let AWS = require('aws-sdk');

let getAllPlansByUser = (req, res) => {
    // Create S3 service object
    let s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create the parameters for calling createBucket
    let bucketParams = {
        Bucket: 'dma-mission-plans'
    };

    // Call S3 to create the bucket
    s3.listObjects(bucketParams, function (err, data) {
        if (err) {
            console.log("Error", err);
            res.status(404).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};

export {getAllPlansByUser};

