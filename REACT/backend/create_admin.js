const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const email = "admin@example.com";
        const password = "admin123";

        // Check if exists
        const existing = await User.findOne({ email });
        if (existing) {
            console.log("User already exists. Updating password...");
            const hashedPassword = await bcrypt.hash(password, 10);
            existing.password = hashedPassword;
            existing.role = "admin";
            await existing.save();
            console.log("✅ User updated.");
        } else {
            console.log("Creating new user...");
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name: "Admin User",
                email,
                password: hashedPassword,
                role: "admin"
            });
            await user.save();
            console.log("✅ User created.");
        }

        console.log(`\n🎉 User Ready!`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        process.exit(0);

    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
};

createAdmin();
