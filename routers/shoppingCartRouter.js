const express = require("express");
const ShoppingCartRouter = express.Router();
const {getAllShoppingCart,addShoppingCart,ejercicio1,deleteProductShoppingCart,ejercicio3} = require("../controllers/shoppingCart");
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

ShoppingCartRouter
    .route("/product/:id")
    .all(protect)
    .delete(deleteProductShoppingCart);

ShoppingCartRouter
    .route("/pay")
    .all(protect)
    .post(ejercicio3);
      
module.exports = ShoppingCartRouter;
