const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

const validateUser = {
  validateCreateUser: (req, res, next) => {
    const { displayName, email, password, image } = req.body;

    const fields = { displayName, email, password, image };

    const { error } = userSchema.validate(fields);

    if (error) return res.status(400).json({ message: error.message });
    next();
  },
};

module.exports = validateUser;
