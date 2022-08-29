const userService = require('../services/user.service');

const userController = {
  getAll: async (_req, res) => {
    const users = await userService.getAll();

    res.status(200).json(users);
  },
  
  create: async (req, res) => {
      const { displayName, email, password, image } = req.body;

      const token = await userService.create(
        { displayName, email, password, image },
      );

      if (!token) return res.status(409).json({ message: 'User already registered' });
  
    res.status(201).json({ token });
  },
};

module.exports = userController;
