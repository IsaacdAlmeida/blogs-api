const categoriesService = require('../services/categories.service');

const categoriesController = {
  getAll: async (_req, res) => {
    const categories = await categoriesService.getAll();

    res.status(200).json(categories);
  },

  create: async (req, res) => {
    const { name } = req.body;

    const result = await categoriesService.create({
      name,
    });

    res.status(201).json(result);
  },
};

module.exports = categoriesController;