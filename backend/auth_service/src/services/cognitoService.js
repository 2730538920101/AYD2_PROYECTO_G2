const AWS = require('aws-sdk');
const config = require('../config/config');

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: config.aws.region,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
});

const authenticateUser = async (username, password) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: config.aws.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  return await cognito.initiateAuth(params).promise();
};

const verifyToken = async (token) => {
  const params = {
    AccessToken: token,
  };
  return await cognito.getUser(params).promise();
};

module.exports = {
  authenticateUser,
  verifyToken,
};
