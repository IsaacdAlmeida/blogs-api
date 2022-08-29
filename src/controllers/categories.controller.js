const categoriesService = require('../services/categories.service');

const categoriesController = {
  create: async (req, res) => {
    const { name } = req.body;

    const result = await categoriesService.create({
      name,
    });

    res.status(201).json(result);
  },
};

module.exports = categoriesController;