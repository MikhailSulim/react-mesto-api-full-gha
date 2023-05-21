const express = require('express');

const signupRouter = express.Router();

const {
  userSignupValidator,
} = require('../middlewares/validators/usersValidator');

const { createUser } = require('../controllers/users');

signupRouter.post('/signup', userSignupValidator, createUser);

module.exports = signupRouter;
