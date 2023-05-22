// роутер для карточек
const router = require('express').Router();

const {
  // импорт валидаторов celebrate
  cardDataValidator,
  cardIdValidator,
} = require('../middlewares/validators/cardsValidator');

const {
  // импорт контроллеров
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// роутеры
router.get('/', getCards); // возвращает все карточки

router.post('/', cardDataValidator, createCard); // создаёт карточку

router.delete('/:cardId', cardIdValidator, deleteCard); // удаляет карточку по идентификатору

router.put('/:cardId/likes', cardIdValidator, likeCard); // поставить лайк карточке

router.delete('/:cardId/likes', cardIdValidator, dislikeCard); // убрать лайк с карточки

module.exports = router;
