const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  // Get the token from user request cookie

  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error("Token is invalid");
    }
    // Verify the token
    const decodedData = await jwt.verify(token, "omkar");
    //   get the id from the decoded data
    const { _id } = decodedData;

    // find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Bad request: " + err.message);
  }
};

module.exports = { userAuth };
