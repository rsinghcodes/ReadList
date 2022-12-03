const bcrypt = require('bcryptjs');
const { GraphQLError } = require('graphql');

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../util/validators');
const Admin = require('../../models/Admin');
const User = require('../../models/User');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
const generateToken = require('../../middleware/createToken');

module.exports = {
  Query: {
    async getUsers() {
      try {
        const user = await User.find();
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getAdmins() {
      try {
        const admin = await Admin.find();
        return admin;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async loginAdmin(_, { email, password }) {
      const { errors, isValid } = validateLoginInput(email, password);

      if (!isValid) {
        throw new GraphQLError('Errors', {
          extensions: { code: 'BAD_USER_INPUT', errors },
        });
      }

      const admin = await Admin.findOne({ email });

      if (!admin) {
        errors.email = 'Email not found';
        throw new GraphQLError('Email not found', {
          extensions: { code: 'QUERY_NOT_FOUND', errors },
        });
      }

      const match = await bcrypt.compare(password, admin.password);
      if (!match) {
        errors.password = 'Password is invalid!';
        throw new GraphQLError('Password is invalid!', {
          extensions: { code: 'BAD_USER_INPUT', errors },
        });
      }

      const token = generateToken(admin);

      return {
        ...admin._doc,
        id: admin._id,
        token,
      };
    },

    async registerAdmin(
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
        throw new GraphQLError('Errors', {
          extensions: { code: 'BAD_USER_INPUT', errors },
        });
      }
      // Make sure user doesnt already exist
      const admin = await Admin.findOne({ email });
      if (admin) {
        throw new GraphQLError('Email is taken', {
          extensions: {
            code: 'BAD_USER_INPUT',
            errors: {
              email: 'This email is taken',
            },
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newAdmin = new Admin({
        fullname,
        email,
        password,
        createdAt: new Date().toISOString(),
        role: 'admin',
      });

      const res = await newAdmin.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    async deletePostByAdmin(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        if (user.role == 'admin') {
          await Post.findByIdAndDelete(postId);
          return 'Post deleted successfully';
        } else {
          throw new GraphQLError('Action not allowed', {
            extensions: { code: 'AUTHENTICATION_ERROR' },
          });
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteUserByAdmin(_, { userId }, context) {
      const user = checkAuth(context);

      try {
        if (user.role == 'admin') {
          await User.findByIdAndDelete(userId);
          await Post.deleteMany({ user: userId });
          return 'User deleted successfully';
        } else {
          throw new GraphQLError('Action not allowed', {
            extensions: { code: 'AUTHENTICATION_ERROR' },
          });
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteAdmin(_, { adminId }, context) {
      const user = checkAuth(context);

      try {
        if (user.role == 'admin') {
          await Admin.findByIdAndDelete(adminId);
          await Post.deleteMany({ user: adminId });
          return 'Admin deleted successfully';
        } else {
          throw new GraphQLError('Action not allowed', {
            extensions: { code: 'AUTHENTICATION_ERROR' },
          });
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async accountPermission(_, { userId, access }, context) {
      const user = checkAuth(context);

      try {
        if (user.role == 'admin') {
          await User.findByIdAndUpdate(userId, { access }, { new: true });
          return 'Access changed';
        } else {
          throw new GraphQLError('Action not allowed', {
            extensions: { code: 'AUTHENTICATION_ERROR' },
          });
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
