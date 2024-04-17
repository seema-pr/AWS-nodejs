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
