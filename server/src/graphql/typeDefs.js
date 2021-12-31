const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    desc: String!
    body: String!
    slug: String!
    sanitizedHtml: String!
    createdAt: String!
    email: String!
    fullname: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    email: String!
    fullname: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    email: String!
  }
  type Admin {
    id: ID!
    email: String!
    token: String!
    fullname: String!
    createdAt: String!
    updatedAt: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    fullname: String!
    createdAt: String!
    updatedAt: String!
  }
  input UserInput {
    fullname: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input UpdateUserInput {
    fullname: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getUser(userId: ID!): User
    getAllUsers: [User]
    getPosts: [Post]
    getPost(slug: String!): Post
    getPostforUpdate(postId: ID!): Post
  }
  type Mutation {
    registerAdmin(registerInput: UserInput): Admin!
    registerUser(registerInput: UserInput): User!
    loginAdmin(email: String!, password: String!): Admin!
    loginUser(email: String!, password: String!): User!
    updateUser(updateInput: UpdateUserInput, userId: ID!): User!
    createPost(title: String!, desc: String!, body: String!): Post!
    updatePost(postId: ID!, title: String!, desc: String!, body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;
