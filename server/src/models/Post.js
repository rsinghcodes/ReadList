const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  title: String,
  desc: String,
  body: String,
  slug: String,
  sanitizedHtml: String,
  email: String,
  fullname: String,
  createdAt: String,
  updatedAt: String,
  comments: [
    {
      body: String,
      email: String,
      fullname: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      email: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Post", postSchema);
