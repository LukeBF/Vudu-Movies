const express = require("express")

const app = express();

// Routes (Endpoints)
app.get("/",(req,res)=>{
    res.send("The root")
})

app.get("/movies",(req,res)=>{
    
    // res.send("The movie endpoint")

    const movies = [
        {
            title: "Movie 1",
            image: "./img/poster.jpg",
            year: "2019",
            rating: "PG-13",
            length: "120 mins"
           
        },
        {
            title: "Movie 2",
            image: "./img/poster.jpg",
            year: "2018",
            rating: "NR",
            length: "90 mins"
        },
        {
            title: "Movie 3",
            image: "./img/poster.jpg",
            year: "2021",
            rating: "R",
            length: "120 mins",
            rent: "Rent",
            buy: "Buy"
        }
    ]

    // this takes the JavaScript object and converts it into json 
    res.status(200).json({
        total: movies.length,
        data: movies,
        message: "List of movies"
    })
})

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})