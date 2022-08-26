const jwt = require('jsonwebtoken');

require('dotenv').config();

const { JWT_SECRET } = process.env;
const JWT_OPTIONS = { algorithm: 'HS256', expiresIn: '1d' };

const tokenHelper = {
  createToken: (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
  
    return token;
  },

  verifyToken: (token) => {
    const payload = jwt.verify(token, JWT_SECRET);

    return payload;
  },
};

module.exports = tokenHelper;
