const { User } = require('../database/models');
const tokenHelper = require('../helpers/tokenHelper');

const loginService = {
  login: async ({ email, password }) => {
    const result = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!result) return null;

    const token = tokenHelper.createToken({
      email: result.email,
    });

    return token;
  },
};

module.exports = loginService;