const express = require("express");
const deleteRouter = express.Router();

const User = require("../models/user");

// ! Deleting
deleteRouter.delete("/deluser", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    // console.log(deleteUser);

    res.send("User deleted succesfully");
  } catch (err) {
    res.status(400).send("Bad request");
  }
});

module.exports = deleteRouter;
