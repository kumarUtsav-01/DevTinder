const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../model/ConnectionRequest");
const User = require("../model/User");

const router = express.Router();

const USER_ACCEPTED_DETAILS = "firstName lastName photoUrl age gender about";

router.get("/user/requests/retrieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_ACCEPTED_DETAILS);

    console.log("Requests", connections);

    res.status(200).json({
      message: "Successfully retrieved requests",
      data: connections,
    });
  } catch (err) {
    res.status(400).json({ message: `Error: ${err.message}` });
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_ACCEPTED_DETAILS)
      .populate("toUserId", USER_ACCEPTED_DETAILS);

    console.log("Connections", connections);

    const data = connections.map((connection) => {
      if (
        connection.fromUserId._id.toString() === loggedInUser._id.toString()
      ) {
        return connection.toUserId;
      }
      return connection.fromUserId;
    });

    res.status(200).json({
      message: "Connections retrieved",
      data: data,
    });
  } catch (err) {
    res.status(400).json({ message: `Error ${err.message}` });
  }
});

router.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const hideUsers = new Set();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const existingConnections = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    });

    existingConnections.forEach((connection) => {
      hideUsers.add(connection.toUserId.toString());
      hideUsers.add(connection.fromUserId.toString());
    });

    const feedUsers = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(hideUsers) },
        },
        {
          _id: { $ne: loggedInUser._id },
        },
      ],
    })
      .populate(USER_ACCEPTED_DETAILS)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Data received successfully",
      data: feedUsers,
    });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
});

module.exports = router;
