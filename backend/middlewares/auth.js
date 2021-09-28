const jwt = require('jsonwebtoken');

const NotAuthError = require('../errors/not-auth-error');

module.exports = (req, res, next) => {

  const token = req.cookies.jwt;

  if (!token) {
    console.log(req);
    // console.log('test');
    throw new NotAuthError('Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');

  } catch (err) {
    throw new NotAuthError('Необходима авторизация');
  }
  req.user = payload;
  next();

};
