const getUsers = async (req, res) => {
  res.json({ message: "got users" });
};

const createUser = async (req, res) => {
  res.json({ message: `created user` });
};

const deleteUser = async (req, res) => {
  if (!req.body.user) {
    res.status(400);
    throw new Error("Unable to delete user");
  }
  res.json({ message: `deleted user ${req.body.user}` });
};

const updateUser = async (req, res) => {
  if (!req.body.user) {
    res.status(400);
    throw new Error("Unable to update user");
  }
  res.json({ message: `updated user ${req.body.user}` });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
