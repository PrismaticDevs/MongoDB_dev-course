const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const getUsers = async (req, res) => {
  const users = await User.find();
  return res.json(users);
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json(`${email} already has an account`);
  }
  if (!email || !password || !username) {
    return res.json(
      "Username, email, and password are required to create a user"
    );
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({
    email: email,
    password: hash,
    username: username,
  });
  return res.json(`Created user: ${user.username}`);
};

const deleteUser = async (req, res) => {
  const userToDelete = await User.findById(req.params.id);
  if (!userToDelete) {
    return res.json("A user that does not exist and can't be deleted");
  }
  userToDelete.remove();
  return res.json(`Deleted user: ${userToDelete.email}`);
};

const updateUser = async (req, res) => {
  const userToUpdate = await User.findById(req.params.id);
  if (!userToUpdate) {
    return res.json(`${req.body.email} does not have an account`);
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.json(`Updated user: ${updatedUser.email}`);
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
