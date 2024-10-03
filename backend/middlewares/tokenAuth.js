const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new HttpError("Authentication Failed", 401);
    }
    const decodedToken = jwt.verify(token, 'authentacationkey_12987655434');
    req.userData = {
      userId: decodedToken.userId
    };
    next();
  } catch (err) {
    if (err instanceof HttpError) {
      return next(err);
    } else {
      console.log(err);
      return next(new HttpError("Authentication Failed", 401));
    }
  }
}