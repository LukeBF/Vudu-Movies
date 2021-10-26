const express = require("express")

//Import Cors
const cors = require("cors")

// Import Mongoose
const mongoose = require('mongoose');

// Import Keys
require ('dotenv').config({path:"config/Keys.env"})

// Import FileUpload
const fileupload = require('express-fileupload')

// Import Controllers / load routers
const movieController = require("./controllers/MovieController.js")
const userController = require("./controllers/UserController.js")
const authController = require("./controllers/AuthController.js")

const app = express();

// Middleware
app.use(express.json());
app.use(fileupload());

//Connect to frontend 
app.use(cors({
    origin: "http://localhost:3000"
}));

app.use("/movies",movieController);
app.use("/users",userController);
app.use("/users/auth",authController)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

    // Connect to MongoDB using connection string stored in .env 
    mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log(`MongoDB is connected`)
    })
    .catch(err=>console.log(`Error ${err}`))

})