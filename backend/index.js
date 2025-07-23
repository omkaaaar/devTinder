// const { ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const port = 3000;
const { validateSignup } = require("./utils/validatingSignup");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const connectDB = require("./config/db");
const User = require("../backend/models/user");

app.use(express.json());
app.use(cookieParser());

// ! Posting a user to DB
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("invalid login info");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const token = await jwt.sign({ _id: user._id }, "Password");

      res.cookie("jwt", token);
      console.log(token);

      res.send("Login sucessful!!");
    } else {
      throw new Error("Invalid login info");
    }
  } catch (error) {
    res.status(400).send("Bad request: " + error.message);
  }
});

// ! Getprofile
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!jwt) {
      return res.status(401).send("You are not logged in");
    }
    const decoded = jwt.verify(cookies.jwt, "Password");

    const { _id } = decoded;

    const user = await User.findById(_id);
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
app.put("/user/:userId", async (req, res) => {
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
