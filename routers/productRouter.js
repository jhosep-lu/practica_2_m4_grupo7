const express = require("express");
const productRouter = express.Router();
const { getAllProducts,addProduct,getProductId,updateProductId,deleteProductId } = require("../controllers/Product");
const {regUser,login,protect} = require("../controllers/Auth");

productRouter
    .route("/")
    .all(protect)
    .get(getAllProducts)
    .post(addProduct);

productRouter
    .route("/:id")
    .all(protect)
    .get(getProductId)
    .put(updateProductId)
    .delete(deleteProductId);


module.exports = productRouter;