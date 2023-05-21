const { Joi, celebrate } = require('celebrate');
const { REGEX_URL } = require('../../utils/constants');

const userSignupValidator = celebrate({
  // валидируем параметры при регистрации прльзователя
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REGEX_URL),
  }),
});

const userSigninValidator = celebrate({
  // валидируем параметры при входе пользователя
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userIdValidator = celebrate({
  // валидируем параметры id пользователя
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const userDataValidator = celebrate({
  // валидируем данные пользователя: имя и описание
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const userAvatarValidator = celebrate({
  // валидируем ссылку на аватар пользователя
  body: Joi.object().keys({
    avatar: Joi.string().pattern(REGEX_URL),
  }),
});

module.exports = {
  userSignupValidator,
  userSigninValidator,
  userIdValidator,
  userDataValidator,
  userAvatarValidator,
};
