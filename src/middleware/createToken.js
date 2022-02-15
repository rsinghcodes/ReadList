const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: '1d' }
  );
};

module.exports = generateToken;
