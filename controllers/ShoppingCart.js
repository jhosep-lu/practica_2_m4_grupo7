const ShoppingCart = require("../models/shoppingCart");

const getAllShoppingCart = async (req, res) => {
    const shoppingCarts = await ShoppingCart.find();
    res.status(200).json({
        status: "ok",
        data: shoppingCarts
    });
};

const addShoppingCart = async (req, res) => {
  let newShoppingCart = new ShoppingCart();
  newShoppingCart.invoiceNumber = req.body.invoiceNumber;
  newShoppingCart.status = req.body.status;
  newShoppingCart.totalAmount = req.body.totalAmount;
  newShoppingCart.user = req.body.user;
  newShoppingCart.products = [];
  req.body.products.forEach((product) => {
    let newProduct = {
      productId: product.productId,
      quantity: product.quantity,
      price: product.price,
    };
    newShoppingCart.products.push(newProduct);
  });
  newShoppingCart = await newShoppingCart.save();
  res.status(200).json({
    status: "ok",
    dataInserted: newShoppingCart,
  });
};



module.exports = {
    getAllShoppingCart,
    addShoppingCart
}