const { Category } = require('../database/models');

const categoriesService = {
  create: async ({ name }) => {
    const newCategory = await Category.create({
      name,
    });

    // console.log(newCategory);

    const { dataValues } = newCategory;

    return dataValues;
  },
};

module.exports = categoriesService;