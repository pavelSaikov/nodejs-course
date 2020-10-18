const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const morgan = require('morgan');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const loginRouter = require('./resources/login/login.router');
const { CUSTOM_TOKENS, TokensHandlersMap } = require('./log/log.models');
const {
  checkAuthorizationToken
} = require('./common/check-authorization-token');

process.on('uncaughtException', e =>
  console.log('Uncaught Exception: ', e.message)
);

process.on('unhandledRejection', error => {
  console.log('Unhandled Rejection: ', error.message ? error.message : '');
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

morgan.token(CUSTOM_TOKENS.body, TokensHandlersMap.get(CUSTOM_TOKENS.body));
morgan.token(CUSTOM_TOKENS.params, TokensHandlersMap.get(CUSTOM_TOKENS.params));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use(checkAuthorizationToken);

app.use('/users', userRouter);
app.use('/boards', boardRouter);

app.use((err, req, res, _next) => {
  console.error(`Error: ${err.message}`);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
