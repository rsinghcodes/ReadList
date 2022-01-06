const { model, Schema } = require("mongoose");

const adminSchema = new Schema({
  fullname: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model("Admin", adminSchema);
