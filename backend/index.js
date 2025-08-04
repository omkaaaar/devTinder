const express = require("express");
const app = express();
const port = 3000;
// const { validateSignup } = require("./utils/validatingSignup");

const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const auth = require("./routes/auth");
const deleteUser = require("./routes/delete");
const profile = require("./routes/profile");
const request = require("./routes/request");
const update = require("./routes/update");

app.use(express.json());
app.use(cookieParser());

app.use("/", auth);
app.use("/", deleteUser);
app.use("/", profile);
app.use("/", request);
// app.use("/", update);

// ! DB connection
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error: " + err.message);
  });
