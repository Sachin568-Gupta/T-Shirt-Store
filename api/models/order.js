const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCardSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const ProductCard = mongoose.model("ProductCard", ProductCardSchema);
const orderSchema = new mongoose.Schema(
  {
    products: [ProductCardSchema],
    transaction_id: {},
    amount: {
      type: Number,
    },
    address: String,
    updated: Date,
    status: {
      type: String,
      default: "Processing",
      enum: ["Cancelled", "Shipped", "Processing", "Recieved", "Delivered"],
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductCard };
