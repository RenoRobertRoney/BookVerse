const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log(`📂 Active Database: ${mongoose.connection.db.databaseName}`);
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

console.log("Registering /api/auth...");
app.use("/api/auth", require("./routes/authRoutes"));
console.log("Registering /api/books...");
app.use("/api/books", require("./routes/bookRoutes"));
console.log("Registering /api/cart...");
app.use("/api/cart", require("./routes/cartRoutes"));
console.log("Registering /api/orders...");
app.use("/api/orders", require("./routes/orderRoutes"));
console.log("Registering /api/wishlist...");
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
console.log("Registering /api/users...");
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Catch-all 404 for debugging
app.use((req, res) => {
  console.log(`DEBUG: 404 on ${req.method} ${req.url}`);
  res.status(404).json({
    message: "Route not found in backend",
    method: req.method,
    url: req.url
  });
});

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
