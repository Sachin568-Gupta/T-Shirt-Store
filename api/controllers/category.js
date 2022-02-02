const Category = require("../models/category");

const getCategoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    req.category = category;
    next();
  } catch (error) {
    return res.send(400).json({
      error: error,
      message: "Not able to find category in db",
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      data: categories,
      message: "Categories fetches successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err,
      message: "Unable to get categories",
    });
  }
};

const createCategory = async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).json({
    message: "category created successfully",
    code: 1,
  });
};
const getCategory = async (req, res) => {
  res.status(200).json(req.category);
};

const updateCategory = async (req, res) => {
  try {
    const category = req.category;
    category.name = req.body.name;
    const newCategory = await category.save();
    res.status(200).json({
      data: newCategory,
      message: "category updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "Failed to update category",
    });
  }
};

const removeCategory = async (req, res) => {
  try {
    const category = req.category;
    const deleteCategory = await category.remove();
    res.status(200).json({
      data: deleteCategory,
      message: "category removed successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "Failed to delete category",
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  getCategory,
  updateCategory,
  removeCategory,
};
