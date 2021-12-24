const { model, Schema } = require("mongoose");

const adminSchema = new Schema(
  {
    fullname: String,
    password: String,
    email: String,
  },
  { timestamps: true }
);

module.exports = model("Admin", adminSchema);
