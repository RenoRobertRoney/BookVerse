const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const { isAuth } = require("../middleware/authMiddleware");

/* ADD TO WISHLIST */
router.post("/", isAuth, async (req, res) => {
    try {
        const { userId, item } = req.body;
        if (!userId || !item) {
            return res.status(400).json({ message: "Missing userId or item" });
        }

        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) wishlist = new Wishlist({ userId, items: [] });

        // Check if item already exists
        const exists = wishlist.items.find((i) => i._id.toString() === item._id.toString());
        if (exists) {
            return res.status(400).json({ message: "Item already in wishlist" });
        }

        wishlist.items.push(item);
        await wishlist.save();

        res.json(wishlist);
    } catch (err) {
        res.status(500).json({ message: "Failed to add to wishlist", error: err.message });
    }
});

/* GET WISHLIST */
router.get("/:userId", isAuth, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.params.userId });
        res.json(wishlist || { userId: req.params.userId, items: [] });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch wishlist", error: err.message });
    }
});

/* REMOVE FROM WISHLIST */
router.post("/remove", isAuth, async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

        wishlist.items = wishlist.items.filter(item => item._id.toString() !== bookId);
        await wishlist.save();

        res.json(wishlist);
    } catch (err) {
        res.status(500).json({ message: "Error removing from wishlist", error: err.message });
    }
});

module.exports = router;
