const express = require('express')
const router = express.Router()

const userService = require("../services/UserService.js")

// Create a user
router.post("/",userService.createUser)

// Get all users
router.get("/",userService.getAllUsers)

// router.post("/users", (req,res)=>{
//     res.json({
//         message: "Test user was created"
//     })
// })

module.exports = router;