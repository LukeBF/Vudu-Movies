const express = require("express")

//Import Cors

// Import Mongoose
const mongoose = require('mongoose');

// Import Keys
require ('dotenv').config({path:"config/Keys.env"})

// Import Controllers
const movieController = require("./controllers/MovieController.js")
const userController = require("./controllers/UserController.js")

const app = express();

app.use(express.json());

app.use("/movies",movieController);
app.use("/users",userController);

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

    // MongoDB connection string
    mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log(`MongoDB is connected`)
    })
    .catch(err=>console.log(`Error ${err}`))

})