const { Joi, celebrate } = require('celebrate');
const { REGEX_URL } = require('../../utils/constants');

const cardDataValidator = celebrate({
  // валидируем тело запроса: название и ссылку на картинку
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(REGEX_URL),
  }),
});

const cardIdValidator = celebrate({
  // валидируем параметры id карточки
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = { cardDataValidator, cardIdValidator };
