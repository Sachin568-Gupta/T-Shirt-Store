const express = require("express");
const router = express.Router();
const { isAdmin, isSignedIn, isAuthenticated } = require("../controllers/auth");
const { updateStock } = require("../controllers/product");
const { pushOrderInPurchases, getUserById } = require("../controllers/user");
const {
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
  getOrderById,
} = require("../controllers/order");
// adding perameter in request
router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchases,
  updateStock,
  createOrder
);

router.get("/order/getAllOrders/:userId", getAllOrders);
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.get(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);
module.exports = router;
