const mongoose = require("mongoose");

exports.dbConnect = async (req, res) => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database is connnected successfully");
    })
    .catch((err) => {
      console.log("Database connection issues");
      console.log(err);
      process.exit(1);
    });
};
