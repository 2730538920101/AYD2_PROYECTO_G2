const jwt = require('jsonwebtoken');
const cognitoService = require('../services/cognitoService');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    await cognitoService.verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyToken;
