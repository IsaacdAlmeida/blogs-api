const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'any,required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
  }),
  password: Joi.string().required().messages({
    'any,required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
  }),
});

const validadeLogin = {
  validateFields: (req, res, next) => {
    const { email, password } = req.body;

    const fields = { email, password };

    const { error } = loginSchema.validate(fields);

    if (error) return res.status(400).json({ message: error.message });
    next();
  },
};

module.exports = validadeLogin;

// https://github.com/tryber/sd-020-a-store-manager/pull/116/files#diff-14385c709bf4bfc069e8e8acfe0d38522261e1f08a39481c30a840b1275ec7f5
// não lancei custom errors, mas podemos pegar o error de dentro do validade e passar como retorno do json, como pedido no req03.
// como a mensagem é a mesma, então não precisa do switch case