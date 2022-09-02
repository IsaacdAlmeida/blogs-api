const { User } = require('../database/models');
const tokenHelper = require('../helpers/tokenHelper');

const userService = {
  getAll: async () => {
    const result = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    return result;
  },

  findByPk: async (id) => {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    return user;
  },

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

  remove: async ({ userId }) => {
    const id = userId;
    
    const user = await User.findByPk(id);

    if (!user) return null;

    await User.destroy({ where: { id } });

    return true;
  },
};

module.exports = userService;
