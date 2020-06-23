const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

cardsRouter.get('/', (req, res) => {
  const filepath = path.join(__dirname, '../data/cards.json');
  fs.readFile(filepath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    const cards = JSON.parse(data);
    res.send(cards);
  });
});

module.exports = cardsRouter;
