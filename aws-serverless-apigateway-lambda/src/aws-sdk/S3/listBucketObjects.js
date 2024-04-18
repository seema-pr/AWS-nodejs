require('dotenv').config(); // Load environment variables from .env file
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

// Function to list objects in an S3 bucket
async function listObjects() {
    const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });

    const listObjectsParams = {
        Bucket: process.env.BUCKET_NAME,
        key:'/'
    };

    const listCommand = new ListObjectsV2Command(listObjectsParams)

    try {
        const data = await s3Client.send(listCommand);
        console.log("received data ",data)
        
    } catch (error) {
        throw new Error('Error listing objects: ' + error.message);
    }
}

listObjects()

module.exports = listObjects;
