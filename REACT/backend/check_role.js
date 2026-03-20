const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const checkRole = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const email = "admin@gmail.com";
        const user = await User.findOne({ email });

        if (user) {
            console.log(`User found: ${user.email}`);
            console.log(`Role: '${user.role}'`);
        } else {
            console.log(`User ${email} not found.`);
        }

        process.exit(0);

    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
};

checkRole();
