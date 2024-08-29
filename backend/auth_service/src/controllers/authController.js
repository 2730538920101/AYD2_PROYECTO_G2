const cognitoService = require('../services/cognitoService');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const authResult = await cognitoService.authenticateUser(username, password);
    res.status(200).json(authResult.AuthenticationResult);
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const userData = await cognitoService.verifyToken(token);
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  verify,
};
