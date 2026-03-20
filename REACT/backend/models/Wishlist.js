const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            _id: { type: String, required: true },
            title: { type: String, required: true },
            author: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
            category: { type: String, required: true },
            rating: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
