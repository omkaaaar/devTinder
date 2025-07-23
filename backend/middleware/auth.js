const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  // Get the token from user request cookie

  const { token } = req.cookies;
  // Verify the token
  const decodedData = await jwt.verify(token, "Password");
  //   get the id from the decoded data
  const { _id } = decodedData;

  // find the user
  const user = await User.findById(_id);
  if (!user) {
    throw new Error("Usr not found");
  }
  req.user = user;
  next();
};
