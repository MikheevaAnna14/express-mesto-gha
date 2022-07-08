const jwt = require('jsonwebtoken');

const AUTHORIZATION_ERROR = 401;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(AUTHORIZATION_ERROR).send({ message: 'Необходима авторизация' });
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    res.status(AUTHORIZATION_ERROR).send({ err, message: 'Необходима авторизация' });
    return;
  }
  req.user = payload;
  next();
};
