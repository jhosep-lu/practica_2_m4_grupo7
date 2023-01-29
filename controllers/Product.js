const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        status: "ok",
        data: products
    });
};

const addProduct = async (req, res) => {
    let newProduct = new Product();
    newProduct.name = req.body.name; 
    newProduct.price = req.body.price; 
    newProduct.unit = req.body.unit; 
    newProduct.inventory = req.body.inventory;
    newProduct = await newProduct.save(); 
    res.status(200).json({
        status: "ok",
        dataInserted: newProduct
    });
};

//GET /api/v1/product/:id.  //Devuelve un producto de la bd con el id 
const getProductId = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        status: "ok",
        data: product
    });
};

//PUT /api/v1/product/:id.  //Modifica el producto de la bd con el id 
const updateProductId = async (req, res) => {
    let updateProduct = await Product.findById(req.params.id);
    updateProduct.name = req.body.name; 
    updateProduct.price = req.body.price; 
    updateProduct.unit = req.body.unit; 
    updateProduct.inventory = req.body.inventory;
    updateProduct = await updateProduct.save(); 
    res.status(200).json({
        status: "ok",
        dataUpdate: updateProduct,
        mensaje: "Producto modificado"
    });
};
//DELETE /api/v1/product/:id. //Elimina el producto de la bd con el id 
const deleteProductId = async (req, res) => {
    const products = await Product.findById(req.params.id);
    await Product.deleteOne(products);
    res.status(200).json({
        status: "ok",
        mensaje: "Producto eliminado"
    });
};


module.exports = {
    getAllProducts,
    addProduct,
    getProductId,
    updateProductId,
    deleteProductId
}