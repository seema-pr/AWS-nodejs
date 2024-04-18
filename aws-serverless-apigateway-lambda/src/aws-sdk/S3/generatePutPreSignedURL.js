require('dotenv').config(); // Load environment variables from .env file
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

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
        Key: `uploads/user-uploads/${key}`,
        ContentType: contentType,
    };

    const putCommand = new PutObjectCommand(putObjectParams);

    try {
        const getSignedUrlForPut = await getSignedUrl(s3Client, putCommand, { expiresIn: 3600 });
        return getSignedUrlForPut;
    } catch (error) {
        throw new Error('Error generating pre-signed URL for PUT operation: ' + error.message);
    }
}

// Call the function to generate the pre-signed URL
const PUT_FILE_KEY_IN_S3 = process.env.PUT_FILE_KEY_IN_S3;
const PDF_CONTENT_TYPE = process.env.PDF_CONTENT_TYPE;

generatePreSignedURLForPut(PUT_FILE_KEY_IN_S3, PDF_CONTENT_TYPE)
    .then(url => console.log('Pre-signed URL for PUT:', url))
    .catch(error => console.error(error.message));
    
module.exports = generatePreSignedURLForPut;
