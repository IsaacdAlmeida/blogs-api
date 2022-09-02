const postService = require('../services/post.service');

const postController = {
  getAll: async (_req, res) => {
    const users = await postService.getAll();

    res.status(200).json(users);
  },

  findByPk: async (req, res) => {
    const { id } = req.params;

    const post = await postService.findByPk(id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(post);
  },

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