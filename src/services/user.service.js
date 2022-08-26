const { User } = require('../database/models');
const tokenHelper = require('../helpers/tokenHelper');

const userService = {
  create: async ({ displayName, email, password, image }) => {
    const validateEmail = await User.findOne({
      where: { 
        email,
      },
      raw: true,
    });
  
    if (validateEmail) return null;

    const newUser = await User.create({
      displayName,
      email,
      password,
      image,
    });

    const token = tokenHelper.createToken({
      email: newUser.email,
    });

    return token;
  },
};

module.exports = userService;
