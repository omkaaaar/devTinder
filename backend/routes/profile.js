const express = require("express");
const profileRouter = express.Router();

const User = require("../models/user");

const { userAuth } = require("../middleware/auth");

// ! Getprofile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

module.exports = profileRouter;
