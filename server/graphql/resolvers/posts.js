const { AuthenticationError, UserInputError } = require("apollo-server");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const dompurify = createDomPurify(new JSDOM().window);

const { validatePostInput } = require("../../util/validators");
const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { slug }) {
      try {
        const post = await Post.findOne({ slug });

        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPostforUpdate(_, { postId }) {
      try {
        const post = await Post.findById(postId);

        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { title, desc, body }, context) {
      const user = checkAuth(context);

      const { errors, valid } = validatePostInput(title, desc, body);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Make sure same title doesn't already exist
      const blogTitle = await Post.findOne({ title });
      if (blogTitle) {
        throw new UserInputError("Title is taken", {
          errors: {
            username: "This title is already taken.",
          },
        });
      }

      const newPost = new Post({
        title,
        slug: slugify(title, { lower: true, strict: true }),
        desc,
        body,
        sanitizedHtml: dompurify.sanitize(marked(body)),
        user: user.id,
        username: user.username,
        fullname: user.fullname,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      context.pubsub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },
    async updatePost(_, { postId, title, desc, body }, context) {
      const user = checkAuth(context);

      const { errors, valid } = validatePostInput(title, desc, body);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          const updatedPost = await Post.findByIdAndUpdate(postId, {
            title,
            slug: slugify(title, { lower: true, strict: true }),
            desc,
            body,
            sanitizedHtml: dompurify.sanitize(marked(body)),
          });

          return updatedPost;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
