const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    lastName: String,
    firstName: String,
    password: String,
    id: String,
  })
);

module.exports = User;
