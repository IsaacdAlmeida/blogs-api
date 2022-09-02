const { Router } = require('express');
const userController = require('../controllers/user.controller');
const userValidator = require('../middlewares/user.validator');
const tokenValidator = require('../middlewares/auth.middleware');

const userRoute = Router();

userRoute.get('/', tokenValidator.validation, userController.getAll);
userRoute.get('/:id', tokenValidator.validation, userController.findByPk);
userRoute.post('/', userValidator.validateCreateUser, userController.create);
userRoute.delete('/me', tokenValidator.validation, userController.remove);

module.exports = userRoute;