const express = require("express");
const authRouter = express.Router();
const {regUser,login} = require("../controllers/Auth");
authRouter
    .route("/login")
    .post(login);
authRouter
    .route("/register")
    .post(regUser);
      
module.exports = authRouter;