const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      bookId: { type: String, required: true },
      title: { type: String, required: true },
      author: { type: String },
      price: { type: Number, required: true },
      image: { type: String },
      quantity: { type: Number, required: true, default: 1 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
