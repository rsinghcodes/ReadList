const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: String,
    password: String,
    email: String,
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
