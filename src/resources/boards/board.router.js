const router = require('express').Router();
const morgan = require('morgan');

const boardsService = require('./board.service');
const tasksService = require('./tasks/task.service');
const { checkIsRequestBoardValid } = require('./board.models');
const {
  checkIsNewRequestTaskValid,
  checkIsUpdatedTaskValid
} = require('./tasks/task.models');
const { CUSTOM_TOKENS } = require('../../log/log.models');

router
  .route('/')
  .all(morgan(`:method :url :${CUSTOM_TOKENS.params} :${CUSTOM_TOKENS.body}`))
  .get(async (req, res) => {
    const boards = await boardsService.getAllBoards();

    res.json(boards);
  })
  .post(async (req, res) => {
    if (!checkIsRequestBoardValid(req.body)) {
      res.status(400).send('Bad request');
      return;
    }

    const newBoard = await boardsService.addBoard(req.body);

    res.json(newBoard);
  });

router
  .route('/:boardId')
  .all(morgan(`:method :url :${CUSTOM_TOKENS.params} :${CUSTOM_TOKENS.body}`))
  .get(async (req, res) => {
    const board = await boardsService.getBoardById(req.params.boardId);

    if (!board) {
      res.status(404).send('Board not found');
      return;
    }

    res.json(board);
  })
  .put(async (req, res) => {
    if (!checkIsRequestBoardValid(req.body)) {
      res.status(400).send('Bad request');
      return;
    }

    const updatedBoard = await boardsService.updateBoard(req.body);

    res.json(updatedBoard);
  })
  .delete(async (req, res) => {
    const result = await boardsService.deleteBoard(req.params.boardId);

    if (!result) {
      res.status(404).send('Board not found');
      return;
    }

    res.status(204).send('The board has been deleted');
  });

router
  .route('/:boardId/tasks')
  .all(morgan(`:method :url :${CUSTOM_TOKENS.params} :${CUSTOM_TOKENS.body}`))
  .get(async (req, res) => {
    const tasks = await tasksService.getAllByBoardId(req.params.boardId);

    if (!tasks) {
      res.status(404).send('Not Found');
      return;
    }

    res.json(tasks);
  })
  .post(async (req, res) => {
    if (!checkIsNewRequestTaskValid(req.body)) {
      res.status(400).send('Bad request');
      return;
    }

    const newTask = await tasksService.addTask(req.params.boardId, req.body);

    res.json(newTask);
  });

router
  .route('/:boardId/tasks/:taskId')
  .all(morgan(`:method :url :${CUSTOM_TOKENS.params} :${CUSTOM_TOKENS.body}`))
  .get(async (req, res) => {
    const task = await tasksService.getById(
      req.params.boardId,
      req.params.taskId
    );

    if (!task) {
      res.status(404).send('Not Found');
      return;
    }

    res.json(task);
  })
  .put(async (req, res) => {
    if (!checkIsUpdatedTaskValid(req.body)) {
      res.status(400).send('Bad request');
      return;
    }

    const updatedTask = await tasksService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );

    if (!updatedTask) {
      res.status(404).send('Task not found');
      return;
    }

    res.json(updatedTask);
  })
  .delete(async (req, res) => {
    const result = await tasksService.deleteTask(
      req.params.boardId,
      req.params.taskId
    );

    if (!result) {
      res.status(404).send('Task not found');
      return;
    }

    res.status(204).send();
  });

module.exports = router;
