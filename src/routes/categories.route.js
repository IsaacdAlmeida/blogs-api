const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');
const categoriesValidator = require('../middlewares/categories.validator');
const tokenValidator = require('../middlewares/auth.middleware');

const categoriesRoute = Router();

categoriesRoute.post('/',
  tokenValidator.validation,
  categoriesValidator.validateCreate, 
  categoriesController.create);

module.exports = categoriesRoute;