const express = require("express");
const ShoppingCartRouter = express.Router();
const {getAllShoppingCart,addShoppingCart,addShoppingCartM,ejercicio1} = require("../controllers/ShoppingCart");
const {protect} = require("../controllers/Auth");
ShoppingCartRouter
    .route("/")
    .get(getAllShoppingCart)
    //.post(addShoppingCartM);
    .post(addShoppingCart);
    

ShoppingCartRouter
    .route("/product")
    .all(protect)
    .post(ejercicio1);
      
module.exports = ShoppingCartRouter;