const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");

const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/", authRouter, profileRouter, requestRouter, userRouter);

connectDB()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server successfully running on Port 7777");
    });
  })
  .catch((err) => {
    console.log("Error while connecting to database");
  });
