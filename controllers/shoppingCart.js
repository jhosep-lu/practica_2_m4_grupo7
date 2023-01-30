const ShoppingCart = require("../models/ShoppingCart");

const addShoppingCart = async (req, res) => {
    let newShoppingCart = new ShoppingCart();
    newShoppingCart.invoiceNumber = req.body.invoiceNumber;
    newShoppingCart.status = req.body.status;
    newShoppingCart.totalAmount = req.body.totalAmount;
    newShoppingCart.user = req.body.user;
    newShoppingCart.products = req.body.products;
    newShoppingCart = await newShoppingCart.save(); 
    res.status(200).json({
        status: "ok",
        dataInserted: newShoppingCart
    });
};

//   POST /api/v1/cart/product  -- Si existe un shopping cart que este en estado PENDING 
//   para el mismo usuario, anadir el producto a ese carrito, 
//   si no creamos el carrito de compras y anadimos el primer producto
const ejercicio1 = async (req, res) => {
    let resultShoppingCart;
    let { invoiceNumber, status,totalAmount,user,products} = req.body;
    const antShoppingCart = await ShoppingCart.findOne({user});
    console.log(antShoppingCart);
    if(antShoppingCart!=null && antShoppingCart.status == "PENDING"){
        antShoppingCart.products = antShoppingCart.products.concat(products);
        resultShoppingCart = await antShoppingCart.save(); 
    }else{
        let newShoppingCart = new ShoppingCart();
        newShoppingCart.invoiceNumber = invoiceNumber;
        newShoppingCart.status = status;
        newShoppingCart.totalAmount = totalAmount;
        newShoppingCart.user = user;
        newShoppingCart.products = products;
        newShoppingCart = await newShoppingCart.save(); 
        resultShoppingCart = newShoppingCart;
    }
    res.status(200).json({
        status: "ok",
        resultShoppingCart: resultShoppingCart
    });
};
module.exports = {
    addShoppingCart,
    ejercicio1
}