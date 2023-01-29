const mongoose = require("mongoose");
const shoppingCartSchema = new mongoose.Schema({
    invoiceNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["PENDING", "PAID"],
    },
    totalAmount: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],

});

const shoppingCartModel = mongoose.model("shoppingCarts",shoppingCartSchema);
module.exports = shoppingCartModel;