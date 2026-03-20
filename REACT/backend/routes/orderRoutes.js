const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

/* GET ALL ORDERS (Admin Only) */
router.get("/", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

/* PLACE ORDER */
router.post("/", isAuth, async (req, res) => {

  try {
    const { items, total, shippingAddress, paymentMethod } = req.body;

    if (!items || !total || !shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    const order = new Order({
      userId: req.user.userId, // Use userId from the authenticated token
      items,
      total,
      shippingAddress,
      paymentMethod
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
});

/* GET USER ORDERS */
router.get("/:userId", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

module.exports = router;
