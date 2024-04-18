npm i -g serverless
serverless create --template aws-nodejs
npm i serverless-dotenv-plugin
// Before deployment test in offline
serverless plugin install -n serverless-offline
serverless offline --region ap-south-1
serverless config credentials --provider aws --key xxxxxxx --secret xxxxxx --profile serverlessUser
serverless deploy --aws-profile serverlessUser

endpoints:
GET - https://f13sa5plc7.execute-api.ap-south-1.amazonaws.com/users
POST - https://f13sa5plc7.execute-api.ap-south-1.amazonaws.com/users/create
PUT - https://f13sa5plc7.execute-api.ap-south-1.amazonaws.com/users/update/{id}

functions:
getUsers: aws-serverless-apigateway-lambda-dev-getUsers (41 MB)
createUsers: aws-serverless-apigateway-lambda-dev-createUsers (41 MB)
updateUsers: aws-serverless-apigateway-lambda-dev-updateUsers (41 MB)

command for Bucket creation
npm i -g aws-sdk
npm i dotenv
node src\aws-sdk\S3\createS3Bucket.js

private-bucket URL:
http://s3-bk-aws-sdk-lambda-serverless.s3.amazonaws.com/

public-bucket URL:
http://s3-bk-aws-sdk-nodejs-public.s3.amazonaws.com/

genearate preSignedURL
npm install @aws-sdk/client-s3
npm install @aws-sdk/s3-request-presigner

node .\src\aws-sdk\S3\preSignedURL.js
