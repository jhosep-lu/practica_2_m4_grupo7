const express = require("express");
const userRouter = express.Router();
const {getAllUsers,addUser,getUserId,updateUserId,deleteUserId} = require("../controllers/User")
const {regUser,login,protect} = require("../controllers/Auth");

userRouter
    .route("/")
    .all(protect)
    .get(getAllUsers)
    .post(addUser);

userRouter
    .route("/:id")
    .all(protect)
    .get(getUserId)
    .put(updateUserId)
    .delete(deleteUserId);

module.exports = userRouter;