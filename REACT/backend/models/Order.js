const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: "Order Placed" },
  shippingAddress: Object,
  paymentMethod: String
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
