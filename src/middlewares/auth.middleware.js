const tokenHelper = require('../helpers/tokenHelper');

const tokenValidator = {
  validation: (req, res, next) => {
    const { authorization } = req.headers;

    try {
      if (!authorization) return res.status(401).json({ message: 'Token not found' });
      
      tokenHelper.verifyToken(authorization);
      // const dataToken = 
      // req.userId = dataToken.id;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  },
};

module.exports = tokenValidator;

// https://github.com/tryber/sd-020-a-live-lectures/blob/lecture/24.3/middlewares/auth.js