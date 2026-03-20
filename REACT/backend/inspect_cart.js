const mongoose = require("mongoose");
const Cart = require("./models/Cart");
require("dotenv").config();

const inspectAllCarts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const carts = await Cart.find({});
        console.log(`Found ${carts.length} carts.`);

        carts.forEach(cart => {
            console.log(`\nCart for User: ${cart.userId}`);
            console.log(JSON.stringify(cart.items, null, 2));
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

inspectAllCarts();
