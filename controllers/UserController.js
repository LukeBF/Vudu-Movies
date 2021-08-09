const express = require('express')
const router = express.Router()

router.post("/users", (req,res)=>{
    res.json({
        message: "Test user was created"
    })
})

module.exports = router;