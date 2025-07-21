const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  about: {
    type: String,
    default: "This is about me",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
