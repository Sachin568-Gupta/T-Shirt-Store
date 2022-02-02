const express = require("express");
const router = express.Router();
const {
  getUserById,
  getUser,
  getAllUsers,
  updateUser,
  getUserOrders,
} = require("../controllers/user");
const { isAdmin, isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/updateUser/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/user/orders/:userId", isSignedIn, isAuthenticated, getUserOrders);
router.get("/users", getAllUsers);

module.exports = router;
