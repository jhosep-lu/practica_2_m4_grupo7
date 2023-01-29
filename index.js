const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Product = require("./models/product");
const User = require("./models/user");
const Login = require("./models/user");
const ShopingCart = require("./models/shoppingCart");
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");
const shoppingCartRouter = require("./routers/shoppingCartRouter");
const authRouter = require("./routers/authRouter");


const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart/product",shoppingCartRouter);

app.use((err, req, res, next) => {
    res.status(400).json({
        status:"error",
        message: err.message
    });
});

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.port}`);
});
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_URL, {}).then(async (con) => {
    console.log("conectado a Mongo");
    // let products = await Product.find();
    // console.log(products);
}).catch((err) => {
    console.log(err);

});