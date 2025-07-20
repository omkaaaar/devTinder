const express = require("express");
const app = express();
const port = 3000;

const connectDB = require("./config/db");
const User = require("../backend/models/user");

// ! Posting a user to DB
app.post("/signup", async (req, res) => {
  const user = new User({
    name: "Omkar",
    lastName: "Kallekar",
    email: "omkar.kallekar@gmail.com",
    age: 24,
    gender: "male",
  });

  try {
    await user.save();
    res.send("User added succesfully");
  } catch (error) {
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
