require('dotenv').config(); // Load environment variables from .env file

const AWS = require('aws-sdk');
console.log(process.env.AWS_ACCESS_KEY_ID)
console.log(process.env.AWS_SECRET_ACCESS_KEY)
console.log(process.env.AWS_REGION)
console.log(process.env.BUCKET_NAME)



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
        LocationConstraint: process.env.AWS_REGION // Specify the region where the bucket should be created
    }
    // Add other parameters as needed
};

// Call the createBucket method to create the bucket
s3.createBucket(params, (err, data) => {
    if (err) {
        console.error('Error creating bucket:', err);
    } else {
        console.log('Bucket created successfully:', data.Location);
    }
});
