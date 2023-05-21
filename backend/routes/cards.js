const express = require('express');

const {
  cardDataValidator,
  cardIdValidator,
} = require('../middlewares/validators/cardsValidator');

const cardRouter = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards); // возвращает все карточки

cardRouter.post('/', cardDataValidator, createCard); // создаёт карточку

cardRouter.delete('/:cardId', cardIdValidator, deleteCard); // удаляет карточку по идентификатору

cardRouter.put('/:cardId/likes', cardIdValidator, likeCard); // поставить лайк карточке

cardRouter.delete('/:cardId/likes', cardIdValidator, dislikeCard); // убрать лайк с карточки

module.exports = cardRouter;
