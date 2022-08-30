const { Category } = require('../database/models');

const categoriesService = {
  getAll: async () => {
    const result = await Category.findAll();

    return result;
  },

  create: async ({ name }) => {
    const newCategory = await Category.create({
      name,
    });

    const { dataValues } = newCategory;

    return dataValues;
  },
};

module.exports = categoriesService;