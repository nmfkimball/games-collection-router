const express = require('express');
const router = express.Router();

const queries = require('../queries');

router.get('/', getGamesHandler);
router.get('/:id', getGameHandler);
router.post('/', createGameHandler);
router.delete('/:id', deleteGameHandler);
router.put('/:id', updateGameHandler);

function getGamesHandler(request, response) {
  queries
    .list()
    .then((games) => {
      response.json({ games });
    })
    .catch(console.error);
}

function getGameHandler(request, response) {
  queries
    .read(request.params.id)
    .then((game) => {
      game ? response.json({ game }) : response.sendStatus(404);
    })
    .catch(console.error);
}

function createGameHandler(request, response) {
  queries
    .create(request.body)
    .then((game) => {
      response.status(201).json({ game });
    })
    .catch(console.error);
}

function deleteGameHandler(request, response) {
  queries
    .delete(request.params.id)
    .then(() => {
      response.sendStatus(204);
    })
    .catch(console.error);
}

function updateGameHandler(request, response) {
  queries
    .update(request.params.id, request.body)
    .then((game) => {
      response.json({ game });
    })
    .catch(console.error);
}

module.exports = router;
