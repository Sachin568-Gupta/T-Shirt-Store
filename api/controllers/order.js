const { Order, ProductCard } = require("../models/order");

const getOrderById = async (req, res, next, id) => {
  try {
    const order = await Order.findById(id).populate(
      "products.product",
      "name price"
    );
    req.order = order;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Not able to fecth order",
      error: error,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    req.body.order.user = req.profile;
    const newOrder = new Order(req.body.order);
    const order = await newOrder.save();
    res.status(201).json({
      data: order,
      message: "New Order successfully done",
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to create order",
      error: error,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "_id name");
    res.status(200).json({
      data: orders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to fetch orders from db",
      error: error,
    });
  }
};

const getOrderStatus = async (req, res) => {
  res.send(Order.schema.path("status").enumValues);
};

const updateStatus = async (req, res) => {
  const order = await Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } }
  );
  res.status(200).json({
    data: order,
    message: "Status updated successfully",
  });
};

module.exports = {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
};
