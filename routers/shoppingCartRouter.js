const express = require("express");
const shoppingCartRouter = express.Router();
const { getAllShoppingCart, addShoppingCart } = require("../controllers/ShoppingCart");

shoppingCartRouter
    .route("/")
    .get(getAllShoppingCart)
    .post(addShoppingCart);


module.exports = shoppingCartRouter;