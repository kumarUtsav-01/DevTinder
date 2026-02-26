const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../model/User");
const { validateUser } = require("../utils/validation");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordHash = await user.validatePassword(password);
    const token = user.createJWT();

    if (!isPasswordHash) {
      throw new Error("Invalid credentials");
    }

    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
    res.json(user);
  } catch (err) {
    res.status(401).send("Error : " + err.message);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;

    validateUser(req.body);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User(
      { firstName, lastName, password: passwordHash, email },
      undefined,
      {
        runValidators: true,
      },
    );

    await user.save();

    const token = user.createJWT();

    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
    res.json({ message: "User saved successfully", data: user });
  } catch (err) {
    res.status(400).send(`Bad request : ${err.message}`);
  }
});

router.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("User logged out!!");
});

router.patch("/forgotPassword", async (req, res) => {
  try {
    const { email, password } = req.body;

    validateUser(req.body);

    const passwordHash = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email: email },
      { password: passwordHash },
      { runValidators: true },
    );
    res.send("Password updated");
  } catch (err) {
    res.status(404).send("Error:" + err.message);
  }
});

module.exports = router;
