const express = require("express");
const profileRouter = express.Router();

const User = require("../models/user");

const { userAuth } = require("../middleware/auth");

// ! Getprofile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
    // console.log(user);
  } catch (error) {
    res.status(400).send("Bad request: " + error.message);
  }
});

// ! Getting users
profileRouter.get("/user", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    res.status(400).send("Bad request");
  }
});

module.exports = profileRouter;
