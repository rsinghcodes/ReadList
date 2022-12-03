const { GraphQLError } = require('graphql');

const checkAuth = require('../../util/check-auth');
const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { email, fullname } = checkAuth(context);
      if (body.trim() === '') {
        throw new GraphQLError('Empty comment', {
          extensions: {
            code: 'BAD_USER_INPUT',
            errors: {
              body: 'Comment field is required',
            },
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          email,
          fullname,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else
        throw new GraphQLError('Post not found', {
          extensions: { code: 'QUERY_NOT_FOUND' },
        });
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { email, admin } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].email === email || admin) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new GraphQLError('Action not allowed', {
            extensions: { code: 'AUTHENTICATION_ERROR' },
          });
        }
      } else {
        throw new GraphQLError('Post not found', {
          extensions: { code: 'QUERY_NOT_FOUND' },
        });
      }
    },
  },
};
