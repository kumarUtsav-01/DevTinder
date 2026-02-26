const express = require("express");
const { userAuth } = require("../middleware/auth");
const User = require("../model/User");

const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const allowedFields = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
      "skills",
      "about",
    ];

    const updatingFields = Object.keys(req.body);
    const isEditValid = updatingFields.every((field) =>
      allowedFields.includes(field),
    );

    if (!isEditValid) {
      throw new Error("Invalid request");
    }

    const user = req.user;
    await User.findByIdAndUpdate(user._id, req.body);

    res.send({ message: "User updated successfully" });
  } catch (err) {
    res.status(401).send("Error:" + err.message);
  }
});

module.exports = router;
