const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports.validateRegisterInput = (
  fullname,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  fullname = !isEmpty(fullname) ? fullname : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : "";

  if (Validator.isEmpty(fullname)) {
    errors.fullname = "Name field is required";
  }
  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required";
  }
  if (!Validator.isLength(password, { min: 6, max: 20 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(password, confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports.validatePostInput = (title, desc, body) => {
  const errors = {};

  title = !isEmpty(title) ? title : "";
  desc = !isEmpty(desc) ? desc : "";
  body = !isEmpty(body) ? body : "";

  if (Validator.isEmpty(title)) {
    errors.title = "Title field is required";
  }
  if (Validator.isEmpty(desc)) {
    errors.desc = "Description is required";
  }
  if (Validator.isEmpty(body)) {
    errors.body = "Markdown is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
