const loginService = require('../services/login.service');

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const token = await loginService.login({ email, password });

    if (!token) return res.status(400).json({ message: 'Invalid fields' });

    return res.status(200).json({ token });
  },
};

module.exports = loginController;