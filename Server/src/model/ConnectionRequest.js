const mongoose = require("mongoose");

const ConnectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "User",
    },
    status: {
      type: String,
      require: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "Not a valid status",
      },
    },
  },
  {
    timestamps: true,
  }
);

ConnectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

ConnectionRequestSchema.pre("save", function (next) {
  const fromUserId = this.fromUserId;
  const toUserId = this.toUserId;

  if (fromUserId.equals(toUserId)) {
    throw new Error("Invalid connection request");
  }

  next();
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  ConnectionRequestSchema
);

module.exports = ConnectionRequest;
