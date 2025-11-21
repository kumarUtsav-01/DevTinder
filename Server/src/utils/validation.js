const validator = require("validator");

const validateUser = (user) => {
  const password = user.password;

  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

module.exports = {
  validateUser,
};
