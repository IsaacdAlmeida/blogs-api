const { Router } = require('express');
const postController = require('../controllers/post.controller');
const postValidator = require('../middlewares/post.validator');
const tokenValidator = require('../middlewares/auth.middleware');

const postRoute = Router();

postRoute.get('/', tokenValidator.validation, postController.getAll);
postRoute.get('/:id', tokenValidator.validation, postController.findByPk);
postRoute.post('/', 
  tokenValidator.validation,
  postValidator.validateContent,
  postController.create);
postRoute.put('/:id', 
  tokenValidator.validation,
  postValidator.validateUpdate,
  postController.update);
postRoute.delete('/:id', 
  tokenValidator.validation, 
  postValidator.validateRemove, 
  postController.remove);

module.exports = postRoute;