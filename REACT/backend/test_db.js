const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const fs = require('fs');

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync('db_test_output.txt', msg + '\n');
};

const testDB = async () => {
    try {
        fs.writeFileSync('db_test_output.txt', ''); // Clear file
        log("🔌 Connecting to MongoDB...");
        log(`Resource: ${process.env.MONGO_URI}`);

        await mongoose.connect(process.env.MONGO_URI);
        log("✅ Connected successfully!");

        const dbName = mongoose.connection.db.databaseName;
        log(`📂 Database Name: '${dbName}'`);

        log("------------------------------------------------");
        log("🔍 Listing all users in this database:");

        const users = await User.find({});
        if (users.length === 0) {
            log("❌ No users found in this database.");
        } else {
            log(`✅ Found ${users.length} users:`);
            users.forEach(u => {
                log(` - Name: ${u.name}, Email: ${u.email}, Role: ${u.role}, ID: ${u._id}`);
            });
        }
        log("------------------------------------------------");

        setTimeout(() => process.exit(0), 1000);
    } catch (err) {
        log("❌ Connection Error: " + err);
        process.exit(1);
    }
};

testDB();
