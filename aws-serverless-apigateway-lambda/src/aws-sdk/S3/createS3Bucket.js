require('dotenv').config(); // Load environment variables from .env file

const AWS = require('aws-sdk');
const generatePreSignedURLs = require('./preSignedURL');

// Configure AWS SDK with credentials and region
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Create a new instance of the S3 service
const s3 = new AWS.S3();

// Define parameters for the bucket creation
const params = {
    Bucket: process.env.BUCKET_NAME ,
    ACL: 'private' , // Specify the bucket's access control list (ACL)
    CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_REGION // the region where the bucket should be created
    }

};

// Call the createBucket method to create the bucket
s3.createBucket(params, (err, data) => {
    if (err) {
        console.error('Error creating bucket:', err);
    } else {
        console.log('Bucket created successfully:', data.Location);
        //generate pre-signed URLs
        // generatePreSignedURLs(process.env.FILE_KEY_IN_S3).then(({ getSignedUrlForGet, getSignedUrlForPut }) => {
        //     // Use the generated pre-signed URLs as needed
        //     console.log('Pre-signed URL for GET:', getSignedUrlForGet);
        //     console.log('Pre-signed URL for PUT:', getSignedUrlForPut);
        // }).catch(error => {
        //     console.error('Error generating pre-signed URLs:', error);
        // });
    }
});