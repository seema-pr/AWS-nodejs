
require('dotenv').config(); // Load environment variables from .env file
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Function to generate a pre-signed URL for GET operation
async function generatePreSignedURLForGet(key) {
    const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });

    const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
    };

    const getCommand = new GetObjectCommand(getObjectParams);

    const getSignedUrlForGet = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });

    return getSignedUrlForGet;
}

// Define the file key for which you want to generate the pre-signed URL
const GET_FILE_KEY_IN_S3 = process.env.GET_FILE_KEY_IN_S3;

// Call the function to generate the pre-signed URL
generatePreSignedURLForGet(GET_FILE_KEY_IN_S3)
    .then(url => console.log('Pre-signed URL for GET:', url))
    .catch(error => console.error(error.message));

module.exports = generatePreSignedURLForGet; 
