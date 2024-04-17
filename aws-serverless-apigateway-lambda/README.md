npm i -g serverless
serverless create --template aws-nodejs
npm i serverless-dotenv-plugin
// Before deployment test in offline
serverless plugin install -n serverless-offline
serverless offline --region ap-south-1
serverless config credentials --provider aws --key xxxxxxx --secret xxxxxx --profile serverlessUser
serverless deploy --aws-profile serverlessUser
