module.exports.validateRegisterInput = (
  fullname,
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (fullname.trim() === "") {
    errors.fullname = "Full Name must not be empty";
  }
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password doesn't match!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Please Enter Username!";
  }
  if (password.trim() === "") {
    errors.password = "Please Enter Password!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validatePostInput = (title, desc, body) => {
  const errors = {};

  if (title.trim() === "") {
    errors.title = "Please enter title of post!";
  }
  if (desc.trim() === "") {
    errors.desc = "Please enter description of post!";
  }
  if (body.trim() === "") {
    errors.body = "Please enter Markdown!";
  }
  // if (slug.trim() === "") {
  //   errors.slug = "Please enter Post URL!";
  // } else {
  //   const regExs = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  //   if (!slug.match(regExs)) {
  //     errors.slug = "Post URL should be valid URL! No uppercase and no spaces.";
  //   }
  // }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
