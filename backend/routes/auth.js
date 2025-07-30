const express = require("express");
const authRouter = express.Router();
const { validateSignup } = require("../utils/validatingSignup");
// const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// const connectDB = require("./config/db");
// const User = require("../backend/models/user");
// const { userAuth } = require("./middleware/auth");

// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const { userAuth } = require("../middleware/auth");

// ! Posting a user to DB
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignup(req);
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send("User added succesfully");
  } catch (error) {
    res.status(400).send("Bad request: " + error.message);
  }
});

// ! Login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("invalid login info");
    }

    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) {
      const token = await user.getJWT();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      // console.log(token);

      res.send("Login sucessful!!");
    } else {
      throw new Error("Invalid login info");
    }
  } catch (error) {
    res.status(400).send("Bad request: " + error.message);
  }
});

module.exports = authRouter;
