const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("this account does not exist");
  }

  if (!(await user.confirmPassword(password))) {
    throw new UnauthenticatedError("Email and password did not match");
  }
  user.password = '';
  const token = user.generateJWT();
  res.status(200).json({ user, token });
};
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("name, email and password are required");
  }
  if (password.search(/^[a-zA-Z0-9]+$/) === -1) {
    throw new BadRequestError(
      "password should contain only letters and numbers"
    );
  }
  if (password.length < 6) {
    throw new BadRequestError("password must be at least 6 characters long");
  }
  if (password.length > 30) {
    throw new BadRequestError("password must not exceed 30 characters");
  }

  const createdUser = await User.create(req.body);
  createdUser.password = '';
  res.status(201).json(createdUser);
};

module.exports = { register, login };
