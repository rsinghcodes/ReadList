const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config');

module.exports = (context) => {
  // context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new GraphQLError('Invalid/Expired token', {
          extensions: { code: 'AUTHENTICATION_ERROR' },
        });
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};
