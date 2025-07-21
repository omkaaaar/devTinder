// const { ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const port = 3000;

const connectDB = require("./config/db");
const User = require("../backend/models/user");

app.use(express.json());

// ! Posting a user to DB
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added succesfully");
  } catch (error) {
    res.status(400).send("Bad request");
  }
});

// ! Getting users
app.get("/user", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    res.status(400).send("Bad request");
  }
});

// ! Deleting
app.delete("/deluser", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    // console.log(deleteUser);

    res.send("User deleted succesfully");
  } catch (err) {
    res.status(400).send("Bad request");
  }
});

// ! Updating
app.put("/user", async (req, res) => {
  const userId = req.body.userId;
  const user = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, user);
    res.send("User updated succesfully");
  } catch (err) {
    res.status(400).send("Bad request");
  }
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
