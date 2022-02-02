const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const getProductById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).populate("category").exec();
    req.product = product;
    next();
  } catch (error) {
    return res.status(400).json({
      error: error,
      message: "Unable to find product in db",
    });
  }
};

const createProduct = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        message: "not able to uplaod picture, file have some issue",
      });
    }
    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fileds",
      });
    }
    let product = new Product(fields);
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }
    const response = await product.save();
    res.status(201).json({
      message: "product created successfully",
      data: response,
    });
  });
};

const getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

const photo = async (req, res, next) => {
  if (req.product.photo.data) {
    res.set("content-type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

const deleteProduct = async (req, res) => {
  try {
    const product = req.product;
    const deletedProduct = await product.remove();
    res.status(200).json({
      data: deletedProduct,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to delete product",
    });
  }
};
const updateProduct = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        message: "not able to uplaod picture, file have some issue",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }
    const response = await product.save();
    res.status(201).json({
      message: "product updated successfully",
      data: response,
    });
  });
};

const getAllProducts = async (req, res) => {
  try {
    const limit = req.query.limit ? req.query.limit : 8;
    const sortBy = req.query.sort ? req.query.sort : "_id";
    const products = await Product.find()
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec();
    res.status(200).json({
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "not able to find products",
    });
  }
};

const updateStock = async (req, res, next) => {
  const operation = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(operation, null, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to update stock",
      });
    }
    next();
  });
};

const getUniqueCategory = async (req, res) => {
  const category = await Product.distinct("category", {});
  res.json({
    data: category,
    message: "Category fetched successfully",
  });
};

module.exports = {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  updateStock,
  getUniqueCategory,
};
