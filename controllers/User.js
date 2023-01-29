const User = require("../models/user");

// GET /api/v1/user.    //Devuelve todos los usuarios registrados en la bd
const getAllUsers = async (req,res) =>{
    const users = await User.find();
    res.status(200).json({
        status: "ok",
        data: users,
    });
}

// POST /api/v1/user.   //Inserta un usuario en la bd
const addUser = async (req, res) => {
    let newUser = new User();
    newUser.name = req.body.name; 
    newUser.last_name = req.body.last_name; 
    newUser.email = req.body.email; 
    newUser.phone = req.body.phone;
    newUser = await newUser.save(); 
    res.status(200).json({
        status: "ok",
        dataInserted: newUser,
    });
};

//GET /api/v1/user/:id.  //Devuelve un usuario de la bd con el id 
const getUserId = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status: "ok",
        data: user
    });
};

//PUT /api/v1/user/:id.  //Modifica el usuario de la bd con el id 
const updateUserId = async (req, res) => {
    let updateUser = await User.findById(req.params.id);
    updateUser.name = req.body.name; 
    updateUser.last_name = req.body.last_name; 
    updateUser.email = req.body.email; 
    updateUser.phone = req.body.phone;
    updateUser = await updateUser.save(); 
    res.status(200).json({
        status: "ok",
        dataUpdate: updateUser,
        mensaje: "Usuario modificado"
    });
};

//DELETE /api/v1/user/:id. //Elimina el usuario de la bd con el id
const deleteUserId = async (req, res) => {
    const users = await User.findById(req.params.id);
    await User.deleteOne(users);
    res.status(200).json({
        status: "ok",
        mensaje: "Usuario eliminado"
    });
};

module.exports = {
    getAllUsers,
    addUser,
    getUserId,
    updateUserId,
    deleteUserId,
}