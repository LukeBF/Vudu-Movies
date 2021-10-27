const userModel = require("../model/UserModel.js")

// Import bcrypt
/**
 * does not have to be imported into the entry point file, only the file that is going to be doing the encoding
 */
const bcrypt = require('bcryptjs');

// Add/create a new customer or user
exports.createUser = (req,res)=>{
    // const newUserData = req.body;
    // const newUser = new userModel(newUserData)

    const user = new userModel({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        isAdmin:req.body.isAdmin
    })
    user.save()

    .then((user)=>{

        /**
         * a salt - a random string that provides an extra layer of hashing
         */
        //async operation
        bcrypt.genSalt(10)

        .then(salt=>{
            bcrypt.hash(user.password,salt)

            // async operation
            //hash = the new encrypted password
            .then(hash=>{
                user.password=hash;
                user.save()

                .then(newUser=>{
                    res.json({
                        message: "User successfully created",
                        data: newUser
                    })
                })
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: `Error: ${err}`
            })
        })

        // res.json({
        //     message: "User successfully created",
        //     data: user
        // })
    })
    .catch(err=>{
        res.status(500).json({
            message: `Error: ${err}`
        })
    })
}

// Get all customers/users
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

// Get a single customer/user
exports.getSingleUser = (req,res)=>{

    userModel.findById(req.params.id)

    .then((user)=>{

        if(user)
        {
            res.json({
                message: `A user was found with ID:${req.params.id}`,
                data: user
            })
        }
        else
        {
            res.status(404).json({
                message: `No user was found with ID:${req.params.id}`,
            })
        }
        
    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`,
        })

    })
      
};

// Update a single movie
exports.updateSingleUser = (req,res)=>{

    // const movieID = parseInt(req.params.id);
    const updatedUser = req.body

    // movieModel.findByIdAndUpdate({id:movieID},req.body,{new:true})
    userModel.findByIdAndUpdate(req.params.id,updatedUser,{new:true})


    .then((user)=>{
        
        if(user)
        {
            res.json({
                message: `User with ID:${req.params.id} was successfully updated.`,
                data: user
            })
        }
        else
        {
            res.status(404).json({
                message: `User with ID: ${req.params.id} was not found`
            })
        }
    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`,
        })
    })
};

exports.deleteSingleUser = (req,res)=>{

    // const movieID = parseInt(req.params.id);

    userModel.findByIdAndRemove(req.params.id)

    .then((user)=>{
        
        if(user)
        {
            res.json({
                message: `User with ID:${req.params.id} was successfully deleted.`,
            })
        }
        else
        {
            res.status(404).json({
                message: `User with ID: ${req.params.id} was not found`
            })
        }
    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`,
        })

    })

};


exports.authenticateUser = (req,res)=>{
    // 1. check if email exists
    // 2. if email exists, check to see if the pw provided exists in the db for that specific document
}

