const express = require("express");
const ConnectionRequest = require("../model/ConnectionRequest");
const User = require("../model/User");
const { userAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const fromUserId = req.user._id;
    const allowedStatus = ["interested", "ignored"];

    const newConnection = new ConnectionRequest(
      {
        toUserId,
        fromUserId,
        status,
      },
      undefined,
      { runValidators: true }
    );

    const isValidStatus = allowedStatus.includes(status);

    if (!isValidStatus) {
      throw new Error("Not a valid status");
    }

    const userExists = await User.findById(toUserId);

    if (!userExists) {
      throw new Error("User does not exists");
    }

    const isExistingConnection = await ConnectionRequest.findOne({
      $or: [
        { toUserId, fromUserId },
        {
          toUserId: fromUserId,
          fromUserId: toUserId,
        },
      ],
    });

    if (isExistingConnection) {
      throw new Error("Connection request already exists");
    }

    const data = await newConnection.save();

    res.status(200).json({
      message: "Connection request saved successfully",
      data,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        throw new Error("Not a valid status");
      }

      const request = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!request) {
        throw new Error("Connection request invalid");
      }

      request.status = status;
      const data = await request.save();

      res.status(200).json({
        message: "Connection reviewed successfully",
        data: data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

module.exports = router;
