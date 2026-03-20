const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const testAuth = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const testEmail = "testuser_debug@example.com";
        const testPassword = "password123";

        // Cleanup previous run
        await User.deleteOne({ email: testEmail });

        console.log("Creating test user...");
        const hashedPassword = await bcrypt.hash(testPassword, 10);
        console.log(`Hashed password: ${hashedPassword}`);

        const user = new User({
            name: "Debug User",
            email: testEmail,
            password: hashedPassword
        });
        await user.save();
        console.log("Test user saved.");

        console.log("Attempting login simulation...");
        const foundUser = await User.findOne({ email: testEmail });
        if (!foundUser) {
            console.error("❌ User not found after save!");
            process.exit(1);
        }
        console.log("User found in DB.");

        const isMatch = await bcrypt.compare(testPassword, foundUser.password);
        if (isMatch) {
            console.log("✅ SUCCESS: Password matches!");
        } else {
            console.error("❌ FAILURE: Password does not match!");
            console.log(`Input: ${testPassword}`);
            console.log(`Stored Hash: ${foundUser.password}`);
        }

        // Cleanup
        await User.deleteOne({ email: testEmail });
        console.log("Cleanup done.");
        process.exit(0);

    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
};

testAuth();
