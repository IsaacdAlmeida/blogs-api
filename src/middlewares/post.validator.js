const Joi = require('joi');
const { BlogPost } = require('../database/models');

const MESSAGE_REQUIRED = 'Some required fields are missing';

const postSchema = Joi.object({
  title: Joi.string().required().messages({
    'any,required': MESSAGE_REQUIRED,
    'string.empty': MESSAGE_REQUIRED,
  }),
  content: Joi.string().required().messages({
    'any,required': MESSAGE_REQUIRED,
    'string.empty': MESSAGE_REQUIRED,
  }),
  categoryIds: Joi.array().required().messages({
    'any,required': MESSAGE_REQUIRED,
  }),
});

const updateSchema = Joi.object({
  title: Joi.string().required().messages({
    'any,required': MESSAGE_REQUIRED,
    'string.empty': MESSAGE_REQUIRED,
  }),
  content: Joi.string().required().messages({
    'any,required': MESSAGE_REQUIRED,
    'string.empty': MESSAGE_REQUIRED,
  }),
});

const validatePost = {
  validateContent: (req, res, next) => {
    const { title, content, categoryIds } = req.body;

    const post = { title, content, categoryIds };

    const { error } = postSchema.validate(post);

    if (error) return res.status(400).json({ message: error.message });

    next();
  },

  validateUpdate: (req, res, next) => {
    const { title, content } = req.body;

    const post = { title, content };

    const { error } = updateSchema.validate(post);

    if (error) return res.status(400).json({ message: error.message });

    next();
  },

  validateRemove: async (req, res, next) => {
    const { id } = req.params;

    const post = await BlogPost.findByPk(id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    next();
  },
};

module.exports = validatePost;
