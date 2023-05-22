// роутер для пользователей
const router = require('express').Router();

const { // импорт валидаторов celebrate
  userIdValidator,
  userDataValidator,
  userAvatarValidator,
} = require('../middlewares/validators/usersValidator');

const { // импорт контроллеров
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

// роутеры
router.get('/', getUsers); // возвращает всех пользователей

router.get('/me', getCurrentUser); // возвращает данные текущего пользователя

router.get('/:userId', userIdValidator, getUser); // возвращает пользователя по _id

router.patch('/me', userDataValidator, updateUser); // обновляет профиль

router.patch('/me/avatar', userAvatarValidator, updateAvatar); // обновляет аватар

module.exports = router;
