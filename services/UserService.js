const userModel = require("../model/UserModel.js")

exports.createUser = (req,res)=>{
    const newUserData = req.body;
    const newUser = new userModel(newUserData)
    newUser.save()

    .then((user)=>{
        res.json({
            message: "User successfully created",
            data: user
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: `Error: ${err}`
        })
    })
}

exports.getAllUsers = (req,res)=>{
    userModel.find()
    .then((users)=>{
        res.json({
            message: "List of all users in the database",
            data: users,
            total: users.length
        })
    })
}

