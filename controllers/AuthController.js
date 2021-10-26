const express = require('express')
const router = express.Router();

const userService = require("../services/userService.js")
// const userModel = require("../model/UserModel.js")

router.post('/register',userService.createUser)

// router.post('/login')

module.exports = router;
