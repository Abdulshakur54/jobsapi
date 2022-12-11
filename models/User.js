const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getEnv } = require("../helpers");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

usersSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});


usersSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      name: this.name,
      DURATION: Date.now(),
    },
    getEnv("JWT_SECRET")
  );
};

usersSchema.methods.confirmPassword = async function (enteredPassword) {
  const matched = await bcrypt.compare(enteredPassword, this.password);
  return matched;
};

const User = mongoose.model("User", usersSchema);
module.exports = User;
