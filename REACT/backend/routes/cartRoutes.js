const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { isAuth } = require("../middleware/authMiddleware");

/* ADD TO CART */
router.post("/", isAuth, async (req, res) => {
  try {
    const { userId, item } = req.body;
    if (!userId || !item) {
      return res.status(400).json({ message: "Missing userId or item" });
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (cartItem) => cartItem.bookId === item._id
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += item.quantity || 1;
    } else {
      // Add new item with correct field mapping
      cart.items.push({
        bookId: item._id, // Map _id from frontend to bookId in schema
        title: item.title,
        author: item.author,
        price: item.price,
        image: item.image,
        quantity: item.quantity || 1,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
});

/* GET CART */
router.get("/:userId", isAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
});

/* UPDATE QUANTITY */
router.put("/update", isAuth, async (req, res) => {
  try {
    const { userId, bookId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(p => p.bookId === bookId);
    if (itemIndex > -1) {
      if (quantity > 0) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.splice(itemIndex, 1);
      }
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating cart", error: err.message });
  }
});

/* REMOVE ITEM */
router.post("/remove", isAuth, async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.bookId !== bookId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error removing item", error: err.message });
  }
});

module.exports = router;
