const { model, Schema } = require("mongoose");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const postSchema = new Schema({
  title: String,
  desc: String,
  body: String,
  sanitizedHtml: String,
  username: String,
  fullname: String,
  createdAt: String,
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
});

postSchema.pre("validate", function () {
  if (this.body) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.body));
  }
});

module.exports = model("Post", postSchema);
