const express = require('express');

const {
  userIdValidator,
  userDataValidator,
  userAvatarValidator,
} = require('../middlewares/validators/usersValidator');

const userRouter = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

userRouter.get('/', getUsers); // возвращает всех пользователей

userRouter.get('/me', getCurrentUser); // возвращает данные текущего пользователя

userRouter.get('/:userId', userIdValidator, getUser); // возвращает пользователя по _id

userRouter.patch('/me', userDataValidator, updateUser); // обновляет профиль

userRouter.patch('/me/avatar', userAvatarValidator, updateAvatar); // обновляет аватар

module.exports = userRouter;
