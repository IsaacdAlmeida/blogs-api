const { Router } = require('express');
const postController = require('../controllers/post.controller');
const postValidator = require('../middlewares/post.validator');
const tokenValidator = require('../middlewares/auth.middleware');

const postRoute = Router();

postRoute.post('/', 
  tokenValidator.validation,
  postValidator.validateContent, 
  postController.create);

module.exports = postRoute;