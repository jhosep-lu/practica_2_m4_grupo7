const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");

const login = catchAsync(async (req,res) =>{

    let { email, password} = req.body;
    if(!email || !password){
        throw new Error("Please provide email and password");
    }

    const user = await User.findOne({email});
    const hashedpassword = crypto.createHash("sha256").update(password).digest("hex"); 
    if(!user || user.password != hashedpassword){
        throw new Error("email o password invalidos");
    }

    const token = jwt.sign( {id: user._id,email, firstName: user.firstName, lastName: user.lastName},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
    );
    
    const cookieOptions = {
        expire: new Date(Date.now() * process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    res.cookie("jwt", token , cookieOptions);
    
    res.status(200).json({
        status: "ok",
        //message: "estas intentando loguearte",
        token
    });
});


const regUser = catchAsync(async (req,res) =>{

    let { email, password,firstName,lastName} = req.body;
    if(!email || !password || !firstName || !lastName){
        throw new Error("Por favor proporcione la informacion completa");
    }

    let newUser = new User();
    newUser.email = email; 
    newUser.password = crypto.createHash("sha256").update(password).digest("hex");  
    newUser.firstName = firstName; 
    newUser.lastName = lastName;
    newUser = await newUser.save();

    res.status(200).json({
        status: "ok",
        message: "Usuario creado",
    });
});

const protect = catchAsync(async (req,res,next) =>{

    let token;
    if(req.headers.authorization){
        token = req.headers.authorization;
    }else{
        throw new Error("Please login");
    }
    const decoded = promisify(jwt.verify)(token,process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;

    next();
});
module.exports = {
    regUser,
    login,
    protect
}