const router = require('express').Router();
const morgan = require('morgan');

const { User } = require('./user.models');
const usersService = require('./user.service');
const { CUSTOM_TOKENS } = require('../../log/log.models');

router
  .route('/')
  .all(morgan(`:method :url :${CUSTOM_TOKENS.params} :${CUSTOM_TOKENS.body}`))
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // console.log('users: ', users);

    res.json(users.map(u => User.toResponse(u)));
  })
  .post(async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Bad request');
      return;
    }

    const newUser = await usersService.addUser(req.body);

    res.json(User.toResponse(newUser));
  });

router
  .route('/:id')
  .all(morgan(`:method :url :${CUSTOM_TOKENS.params} :${CUSTOM_TOKENS.body}`))
  .get(async (req, res) => {
    const users = await usersService.getAll();

    const userId = req.params.id;
    const user = users.find(u => u.id === userId);

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    res.json(User.toResponse(user));
  })
  .put(async (req, res) => {
    const { id, name, login, password } = req.body;

    if (!name) {
      res.status(400).send('Bad request');
      return;
    }

    const updatedUser = await usersService.updateUser({
      id,
      name,
      login,
      password
    });

    if (!updatedUser) {
      res.status(400).send('Bad request');
      return;
    }

    res.json(User.toResponse(updatedUser));
  })
  .delete(async (req, res) => {
    const result = await usersService.deleteUser(req.params.id);

    if (!result) {
      res.status(404).send('User not found');
      return;
    }

    res.status(204).json({ id: result });
  });

module.exports = router;
