const jsonwebtoken = require('jsonwebtoken');

const config = require('../common/config');

const checkAuthorizationToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status('401');
    res.send('Unauthorized');
    return;
  }

  jsonwebtoken.verify(token, config.JWT_SECRET_KEY, err => {
    if (err) {
      res.status('401');
      res.send('Unauthorized');
      return;
    }

    next();
  });
};

module.exports = { checkAuthorizationToken };
