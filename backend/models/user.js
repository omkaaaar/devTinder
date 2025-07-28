const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var validator = require("validator");
const jwt = require("jsonwebtoken");
const { default: isEmail } = require("validator/lib/isEmail");

const UserSchema = new mongoose.Schema(
  {
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
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid gender type");
        }
      },
    },
    skills: {
      type: [],
    },
    about: {
      type: String,
      default: "This is about me",
      max: 300,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "omkar", {
    expiresIn: "1d",
  });
  return token;
};

UserSchema.methods.validatePassword = async function (password) {
  const user = this;
  const hashedPassword = user.password;

  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  return isValidPassword;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
