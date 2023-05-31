const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// our own static method on our User model for signup
//this ftn must be normal async ftn and not arrow ftn in order to make 'this' keyword work

userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  //we don't have User model here, we can just use 'this' here

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email already in use");
  }

  //hashing function to store passwords in DB
  //first create a salt valye and then hash it with user password
  const salt = await bcrypt.genSalt(10); //this takes time to complete that's the 'await'
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

module.exports = mongoose.model("User", userSchema);
