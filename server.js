const express = require("express")

//Import Cors

// Import Mongoose
const mongoose = require('mongoose');

// Import Keys
const Keys = require("./config/Keys.js")

// Import Controllers
const movieController = require("./controllers/MovieController.js")
const userController = require("./controllers/UserController.js")

const app = express();

app.use(express.json());

app.use("/movies",movieController);
app.use("/users",userController);

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

    // MongoDB connection string
    mongoose.connect(`${Keys.MONGODB_CONN_STRING}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log(`MongoDB is connected`)
    })
    .catch(err=>console.log(`Error ${err}`))

})