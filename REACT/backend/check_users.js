const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ role: "user" });
        if (user) {
            console.log(`Regular user found: ${user.email}`);
        } else {
            console.log("No regular users found.");
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkUsers();
