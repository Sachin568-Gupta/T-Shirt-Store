const { order } = require("../models/order");
const User = require("../models/user");

exports.getUserById = async (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encrypt_password = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id name email role purchases").exec();
    return res.status(200).json({
      message: "Fetch users successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      error: "Unable to fetch all users",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.profile._id },
      req.body,
      { new: true }
    ).exec();
    return res.status(200).json({
      message: "User is updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      error: "Unable to update user",
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await order
      .find({ user: req.profile._id })
      .populate("user", "_id name")
      .exec();
    return res.status(200).json({
      data: orders,
      message: "Orders fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "Unable to fetch orders",
    });
  }
};

exports.pushOrderInPurchases = async (req, res, next) => {
  try {
    let purchaseList = [];
    req.body.order.products.forEach((product) => {
      const { _id, name, description, category, stock } = product;
      purchaseList.push({
        _id,
        name,
        description,
        category,
        stock,
        transaction_id: req.body.order.transaction_id,
        amount: req.body.order.amount,
      });
    });
    await User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { purchases: purchaseList } },
      { new: true }
    );
    next();
  } catch (err) {
    res.status(400).json({
      error: err,
      message: "Unable to update purchase list",
    });
  }
};
