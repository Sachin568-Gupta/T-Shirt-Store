const express = require("express");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getUniqueCategory,
} = require("../controllers/product");
const router = express.Router();
const { getUserById } = require("../controllers/user");
const { isAdmin, isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);
router.get("/getAllProducts", getAllProducts);
router.get("/product/category", getUniqueCategory);
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

module.exports = router;
