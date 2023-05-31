const User = require("../models/userModel");

//login user
const loginUser = (req, res) => {
  res.json({ msg: "login user" });
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  //signup method is custom created in userModel

  try {
    const user = await User.signup(email, password);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
