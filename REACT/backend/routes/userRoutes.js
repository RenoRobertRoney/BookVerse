const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuth, isAdmin } = require('../middleware/authMiddleware');

/* GET ALL USERS (Admin Only) */
router.get('/', isAdmin, async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude passwords
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err.message });
    }
});


/* GET USER ADDRESSES */
router.get('/address', isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.addresses || []);
    } catch (err) {
        res.status(500).json({ message: "Error fetching addresses", error: err.message });
    }
});

/* ADD ADDRESS */
router.post('/address/add', isAuth, async (req, res) => {
    console.log("POST /api/users/address/add hit", req.body);
    try {
        const { address } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.addresses) user.addresses = [];

        // If first address, make it default
        if (user.addresses.length === 0) {
            address.default = true;
        }

        user.addresses.push(address);
        await user.save();

        res.json(user.addresses);
    } catch (err) {
        res.status(500).json({ message: "Error adding address", error: err.message });
    }
});

/* REMOVE ADDRESS */
router.post('/address/remove', isAuth, async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        user.addresses = user.addresses.filter(addr => addr.id !== id);
        await user.save();

        res.json(user.addresses);
    } catch (err) {
        res.status(500).json({ message: "Error removing address", error: err.message });
    }
});

/* SET DEFAULT ADDRESS */
router.post('/address/default', isAuth, async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        user.addresses.forEach(addr => {
            addr.default = (addr.id === id);
        });

        await user.save();
        res.json(user.addresses);
    } catch (err) {
        res.status(500).json({ message: "Error setting default address", error: err.message });
    }
});

/* UPDATE PROFILE */
router.put('/profile', isAuth, async (req, res) => {
    try {
        const { name, phone, password } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        if (phone) user.phone = phone;

        const bcrypt = require('bcryptjs');
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Error updating profile", error: err.message });
    }
});

module.exports = router;
