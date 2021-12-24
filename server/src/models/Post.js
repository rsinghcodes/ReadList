const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    title: String,
    desc: String,
    body: String,
    slug: String,
    sanitizedHtml: String,
    username: String,
    fullname: String,
    comments: [
      {
        body: String,
        username: String,
        fullname: String,
        createdAt: String,
      },
    ],
    likes: [
      {
        username: String,
        createdAt: String,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
