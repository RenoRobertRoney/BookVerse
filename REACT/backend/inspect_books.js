const mongoose = require("mongoose");
const Book = require("./models/Book");
require("dotenv").config();

const checkSandman = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const book = await Book.findOne({ title: "The Sandman, Vol. 1" });
        if (book) {
            console.log(`TITLE: ${book.title}`);
            console.log(`CATEGORY: "${book.category}"`);
            console.log(`CATEGORY_HEX: ${Buffer.from(book.category).toString('hex')}`);
        } else {
            console.log("Sandman not found");
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkSandman();
