const ShoppingCart = require("../models/ShoppingCart");
const catchAsync = require("../utils/catchAsync");

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

const addShoppingCartM = async (req, res) => {
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

// DELETE /api/v1/cart/product/:id -- Si existe un shopping cart que este en estado PENDING 
// y que tenga ese producto removemos el producto de ese carrito, sino damos error

// POST /api/v1/cart/pay -- Paga el carrito que este en estado pendiente con minimo un producto en el.
// Si no existe un carrito con estas caracteristicas se dispara un error

const ejercicio3 = catchAsync(async (req, res) => {
    //let resultShoppingCart;
    const todoShoppingCart = await ShoppingCart.find();
    console.log("mica")
    console.log(todoShoppingCart);
    let sw = 0;
    if(todoShoppingCart != null){
        todoShoppingCart.forEach((antShoppingCart) => {        
            if(antShoppingCart.status == "PENDING" && antShoppingCart.products.length == 1){
                antShoppingCart.status = "PAID";
                //antShoppingCart.save();
                sw = 1;
                
            }
        });
    }
     
    //await todoShoppingCart.save(); 
    if(sw == 0){
        throw new Error("el carrito no existe");
    }
    res.status(200).json({
        status: "ok",
        message: "Carrito pagado"
    });
});



module.exports = {
    addShoppingCart,
    addShoppingCartM,
    getAllShoppingCart,
    ejercicio1,
    ejercicio3
}