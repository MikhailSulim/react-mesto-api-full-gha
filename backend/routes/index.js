// обобщённый роутер для карточек и пользователей
const router = require('express').Router();

const users = require('./users');
const cards = require('./cards');

// импорт мидлвэра авторизации
const auth = require('../middlewares/auth');

// импорт контроллеров
const { login, createUser, logout } = require('../controllers/users');

// импорт валидаторов
const {
  userSigninValidator,
  userSignupValidator,
} = require('../middlewares/validators/usersValidator');

// импорт кастомной ошибки
const NotFoundError = require('../errors/NotFoundError');

// краш тест сервера
// router.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

// роуты без авторизации
router.post('/signin', userSigninValidator, login);
router.post('/signup', userSignupValidator, createUser);

// роуты с авторизацией
router.use('/users', auth, users);
router.use('/cards', auth, cards);
router.get('/signout', auth, logout);

// роут для любых других/несуществующих путей
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый URL не существует'));
});

module.exports = router;
