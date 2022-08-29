const { Router } = require('express');
const userController = require('../controllers/user.controller');
const userValidator = require('../middlewares/user.validator');
const tokenValidator = require('../middlewares/auth.middleware');

const userRoute = Router();

userRoute.get('/', tokenValidator.validation, userController.getAll);
userRoute.post('/', userValidator.validateCreateUser, userController.create);

module.exports = userRoute;