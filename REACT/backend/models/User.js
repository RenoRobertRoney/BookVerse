const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // user | admin
    phone: { type: String },
    addresses: [
      {
        id: String,
        country: String,
        fullName: String,
        mobile: String,
        pincode: String,
        house: String,
        area: String,
        landmark: String,
        city: String,
        state: String,
        default: { type: Boolean, default: false }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
