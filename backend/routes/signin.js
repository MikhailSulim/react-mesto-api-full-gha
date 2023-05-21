const express = require('express');

const signinRouter = express.Router();

const { login } = require('../controllers/users');

const {
  userSigninValidator,
} = require('../middlewares/validators/usersValidator');

signinRouter.post('/signin', userSigninValidator, login);

module.exports = signinRouter;
