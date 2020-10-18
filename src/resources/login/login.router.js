const router = require('express').Router();
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const { CUSTOM_TOKENS } = require('../../log/log.models');
const userService = require('../users/user.service');
const config = require('../../common/config');

router
  .route('/')
  .all(morgan(`:method :url :${CUSTOM_TOKENS.params} :${CUSTOM_TOKENS.body}`))
  .post(async (req, res) => {
    const { login, password } = req.body;

    const user = await userService.getByLogin(login);

    const isPasswordValid = user
      ? await bcrypt.compare(password, user.password)
      : await Promise.resolve(false);

    if (!isPasswordValid) {
      res.status(403);
      res.send('Incorrect login or password');
    }

    const token = jsonwebtoken.sign(
      {
        userId: user.id,
        login: user.login
      },
      config.JWT_SECRET_KEY
    );

    res.json({ token });
  });

module.exports = router;
