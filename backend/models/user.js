const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
