const express = require("express")

// Import Controllers
const movieController = require("./controllers/MovieController")
const userController = require("./controllers/UserController")

const app = express();

app.use(express.json());

app.use("/movies",movieController);
app.use("/users",userController);

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})