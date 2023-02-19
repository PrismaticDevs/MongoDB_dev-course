const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

router.route("/").get(getUsers).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
