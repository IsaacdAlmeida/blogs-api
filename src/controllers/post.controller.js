const postService = require('../services/post.service');

const postController = {
  create: async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { userId } = req;

    const result = await postService.create({
      title, content, categoryIds, userId,
    });

    if (!result) return res.status(400).json({ message: '"categoryIds" not found' });

    return res.status(201).json(result);
  },
};

module.exports = postController;