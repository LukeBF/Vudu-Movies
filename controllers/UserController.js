const express = require('express')
const router = express.Router()

const userService = require("../services/UserService.js")

// Create a user
router.post("/",userService.createUser)

// Get all users
router.get("/",userService.getAllUsers)

/**
 * @description get a single user
 * @method GET /:id
 */
 router.get("/:id",userService.getSingleUser)

 /**
 * @description update a single user
 * @method PUT /:id
 */
router.put("/:id",userService.updateSingleUser)

// Delete a movie
/**
 * @description delete a single user
 * @method DELETE /:id
 */
 router.delete("/:id",userService.deleteSingleUser)



router.post("/auth",userService.authenticateUser)

// router.post("/users", (req,res)=>{
//     res.json({
//         message: "Test user was created"
//     })
// })

module.exports = router;