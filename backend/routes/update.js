const express = require("express");
const updateRouter = express.Router();

const User = require("../models/user");

// ! Updating
updateRouter.put("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = req.body;
  try {
    const allowedUpdate = [
      "firstName",
      "lastName",
      "password",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(user).every((k) =>
      allowedUpdate.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Cannot update");
    }
    if (user?.skills.length > 10) {
      throw new Error("skills cannot exceed the limit of 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, user, {
      runValidators: true,
    });
    res.send("User updated succesfully");
  } catch (err) {
    res.status(400).send("Bad request " + err.message);
  }
});

module.exports = updateRouter;
