const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  fullname: String,
  password: String,
  email: String,
  createdAt: String,
  updatedAt: String,
  access: Boolean,
  role: String,
});

module.exports = model('User', userSchema);
