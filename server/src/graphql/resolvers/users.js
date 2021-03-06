const bcrypt = require('bcryptjs');
const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server');

const {
  validateRegisterInput,
  validateLoginInput,
  validateNewUpdateInput,
} = require('../../util/validators');
const User = require('../../models/User');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
const generateToken = require('../../middleware/createToken');

module.exports = {
  Query: {
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async loginUser(_, { email, password }) {
      const { errors, isValid } = validateLoginInput(email, password);

      if (!isValid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ email });

      if (!user) {
        errors.email = 'Email not found!';
        throw new UserInputError('Email not found!', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.password = 'Password is invalid!';
        throw new UserInputError('Password is invalid!', {
          errors,
        });
      }

      if (!user.access) {
        throw new ForbiddenError('Access denied!');
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async registerUser(
      _,
      { registerInput: { fullname, email, password, confirmPassword } }
    ) {
      const { isValid, errors } = validateRegisterInput(
        fullname,
        email,
        password,
        confirmPassword
      );
      if (!isValid) {
        throw new UserInputError('Errors', { errors });
      }
      // Make sure user doesnt already exist
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError('Email is taken', {
          errors: {
            email: 'Account is already created using this email!',
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        fullname,
        email,
        password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        access: true,
        role: 'user',
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async updateUser(
      _,
      { updateInput: { fullname, password, confirmPassword }, userId }
    ) {
      const { isValid, errors } = validateNewUpdateInput(
        fullname,
        password,
        confirmPassword
      );

      if (!isValid) {
        throw new UserInputError('Errors', { errors });
      }

      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { fullname, password, updatedAt: new Date().toISOString() },
        { new: true }
      );

      await Post.find({ user: userId }).updateMany({ fullname });

      const token = generateToken(updatedUser);

      return {
        ...updatedUser._doc,
        id: updatedUser._id,
        token,
      };
    },
    async deleteUser(_, { userId }, context) {
      const user = checkAuth(context);

      try {
        const current = await User.findById(userId);

        if (user.email === current.email) {
          await current.delete();
          await Post.deleteMany({ user: userId });
          return 'User deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
