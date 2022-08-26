const { Router } = require('express');
const userController = require('../controllers/user.controller');
const userValidator = require('../middlewares/user.validator'); 

const userRoute = Router();

userRoute.post('/', userValidator.validateCreateUser, userController.create);

module.exports = userRoute;