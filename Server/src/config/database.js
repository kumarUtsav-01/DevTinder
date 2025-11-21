const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://KumarUtsav:Mongodb2024@portfolio.k1m2aqm.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
