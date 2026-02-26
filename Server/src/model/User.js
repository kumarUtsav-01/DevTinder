const validator = require("validator");
const mongoose = require("mongoose");
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 25,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 25,
    },
    age: {
      type: Number,
      min: 18,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter valid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    photoUrl: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter valid profile URL");
        }
      },
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "This is a default description.",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.createJWT = function () {
  const user = this;
  const token = jsonWebToken.sign({ _id: user._id }, "Dev@Tinder", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInput) {
  const user = this;
  const isPassowrdValid = await bcrypt.compare(passwordInput, user.password);

  return isPassowrdValid;
};

module.exports = mongoose.model("User", userSchema);
