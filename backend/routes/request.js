const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middleware/auth");

// ! Sending a connection request
requestRouter.post("/sendconnection", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(`${user.firstName} Sent you a request`);
  } catch (err) {
    res.status(400).send("Bad request: " + err.message);
  }
});

module.exports = requestRouter;
