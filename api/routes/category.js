const express = require("express");
const router = express.Router();
const { isAdmin, isSignedIn, isAuthenticated } = require("../controllers/auth");
const {
  getCategoryById,
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");

// adding perameter in request
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.get("/category/getCategories", getCategories);
router.get("/category/getCategory/:categoryId", getCategory);

router.put("/category/update/:categoryId/:userId", updateCategory);
router.delete("/category/delete/:categoryId/:userId", removeCategory);
router.post(
  "/category/createCategory/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

module.exports = router;
