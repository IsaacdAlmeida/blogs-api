const { Router } = require('express');
const loginController = require('../controllers/login.controller');
const loginValidator = require('../middlewares/login.validator');

const loginRoute = Router();

loginRoute.post('/', loginValidator.validateFields, loginController.login);

module.exports = loginRoute;