const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const NotAuthError = require('../errors/not-auth-error');

module.exports = (req, res, next) => {

  const token = req.cookies.jwt;

  if (!token) {
    throw new NotAuthError('Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);

  } catch (err) {
    throw new NotAuthError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
