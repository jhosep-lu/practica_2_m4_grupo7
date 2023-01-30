const express = require("express");
const ShoppingCartRouter = express.Router();
const {addShoppingCart,ejercicio1} = require("../controllers/ShoppingCart");
const {protect} = require("../controllers/Auth");
ShoppingCartRouter
    .route("/")
    .post(addShoppingCart);

ShoppingCartRouter
    .route("/product")
    .all(protect)
    .post(ejercicio1);
      
module.exports = ShoppingCartRouter;