const Joi = require('joi');

const categoriesSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': '"name" is required',
    'any,required': '"name" is required',
  }),
});

const validateCategories = {
  validateCreate: (req, res, next) => {
    const { name } = req.body;

    const field = { name };

    const { error } = categoriesSchema.validate(field);

    if (error) return res.status(400).json({ message: error.message });

    next();
  },
};

module.exports = validateCategories;