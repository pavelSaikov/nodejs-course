const boardsRepo = require('./board.memory.repository');
const tasksService = require('./tasks/task.service');

const getAllBoards = () => boardsRepo.getAllBoards();

const getBoardById = id => boardsRepo.getBoardById(id);

const addBoard = boardProto => boardsRepo.addBoard(boardProto);

const updateBoard = updatedBoard => boardsRepo.updateBoard(updatedBoard);

const deleteBoard = async boardId => {
  const result = await boardsRepo.deleteBoard(boardId);

  if (!result) {
    return result;
  }

  const tasks = await tasksService.getAllByBoardId(boardId);
  await Promise.all(tasks.map(t => tasksService.deleteTask(boardId, t.id)));

  return result;
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
