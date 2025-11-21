const jsonWebToken = require("jsonwebtoken");
const User = require("../model/User");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid token");
    }

    const decodedMessage = jsonWebToken.verify(token, "Dev@Tinder");
    const { _id } = decodedMessage;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User does not exist");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).send("Error : " + err.message);
  }
};

module.exports = {
  userAuth,
};
