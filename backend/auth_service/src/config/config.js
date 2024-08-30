require('dotenv').config();

const config = {
  aws: {
    region: process.env.REGION,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  server: {
    port: process.env.AUTH_SERVICE_PORT || 4000,
  },
};

module.exports = config;
