const express = require('express');
const app = express();
const queries = require('./queries');
const gamesRoutes = require('./routes/games');

app.use(express.json());

app.use('/games', gamesRoutes);

app.use((error, request, response, next) => {
  response.status(500);
  response.json({
    error: error.message,
  });
});

module.exports = app;
