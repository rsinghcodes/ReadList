const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const adminResolvers = require("./admin");
const commentsResolvers = require("./comments");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...usersResolvers.Query,
    ...postsResolvers.Query,
    ...adminResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...adminResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};
