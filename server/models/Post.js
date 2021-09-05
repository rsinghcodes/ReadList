const { model, Schema } = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const dompurify = createDomPurify(new JSDOM().window);

const postSchema = new Schema({
  title: String,
  desc: String,
  body: String,
  slug: String,
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

postSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.body) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.body));
  }

  next();
});

module.exports = model("Post", postSchema);
