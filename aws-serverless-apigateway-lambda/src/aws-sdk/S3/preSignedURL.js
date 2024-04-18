require('dotenv').config(); // Load environment variables from .env file
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
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

// Function to generate a pre-signed URL for PUT operation
async function generatePreSignedURLForPut(key, contentType) {
    const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });

    const putObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        ContentType: contentType,
    };

    const putCommand = new PutObjectCommand(putObjectParams);

    const getSignedUrlForPut = await getSignedUrl(s3Client, putCommand, { expiresIn: 3600 });

    return getSignedUrlForPut;
}

// Main function to generate pre-signed URLs for both GET and PUT operations
async function generatePreSignedURLs(key, contentType) {
    try {
        const getSignedUrlForGet = await generatePreSignedURLForGet(key);
        const getSignedUrlForPut = await generatePreSignedURLForPut(key, contentType);

        return { getSignedUrlForGet, getSignedUrlForPut };
    } catch (error) {
        throw new Error('Error generating pre-signed URLs: ' + error.message);
    }
}

// Usage example
const FILE_KEY_IN_S3 = process.env.FILE_KEY_IN_S3;
const PDF_CONTENT_TYPE = process.env.PDF_CONTENT_TYPE;

generatePreSignedURLs(FILE_KEY_IN_S3, PDF_CONTENT_TYPE)
    .then(urls => console.log('Pre-signed URLs:', urls))
    .catch(error => console.error(error.message));

module.exports = { generatePreSignedURLForGet, generatePreSignedURLForPut, generatePreSignedURLs };
