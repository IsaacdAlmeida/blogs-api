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

  update: async (req, res) => {
    const { title, content } = req.body;
    const { userId } = req;
    const { id } = req.params;

    const result = await postService.update({ title, content, userId, id });

    if (!result) return res.status(401).json({ message: 'Unauthorized user' });

    return res.status(200).json(result);
  },

  remove: async (req, res) => {
    const { userId } = req;
    const { id } = req.params;

    const result = await postService.remove({ userId, id });

    if (!result) return res.status(401).json({ message: 'Unauthorized user' });

    return res.status(204).end();
  },

  search: async (req, res) => {
    const { q } = req.query;

    const result = await postService.search(q);

    return res.status(200).json(result);
  },
};

module.exports = postController;