const userService = require('../services/user.service');

const userController = {
  getAll: async (_req, res) => {
    const users = await userService.getAll();

    res.status(200).json(users);
  },

  findByPk: async (req, res) => {
    const { id } = req.params;

    const user = await userService.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  },
  
  create: async (req, res) => {
      const { displayName, email, password, image } = req.body;

      const token = await userService.create(
        { displayName, email, password, image },
      );

      if (!token) return res.status(409).json({ message: 'User already registered' });
  
    res.status(201).json({ token });
  },

  remove: async (req, res) => {
    const { userId } = req;

    const result = await userService.remove({ userId });

    if (!result) return res.status(401).json({ message: 'Unauthorized user' });

    return res.status(204).end();
  },
};

module.exports = userController;
