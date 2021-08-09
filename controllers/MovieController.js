const express = require('express')
const router = express.Router()

// Import the fake database
const movieModel = require("../model/MovieModel.js")

// Routes (Endpoints)
// GET list of movies
router.get("/",(req,res)=>{
    
    res.json({
    message: "List of all movies",
    total: movieModel.getAllMovies().length,
    data: movieModel.getAllMovies()
    })

})

// GET a specific movie
router.get("/:id", (req,res)=>{

    const id = parseInt(req.params.id)
    
    const foundMovie = movieModel.getAMovie(id)
    
    if(foundMovie != undefined)
    {
        res.json({
            message: `Movie was found with ID:${id}`,
            data: foundMovie
        })
    }
    else
    {
        res.status(404).json({
            message: `The was no movie found with ID:${id}`
        })
    }
  
})

 //CREATE a new movie listing
 router.post("/", (req,res)=>{

    movieModel.createAMovie(req.body);
    const movieTitle = req.body.title;
    res.json({
        message: `${movieTitle} was successfully added to the database.`,
        data: req.body
    })
})

// Send a PUT request to UPDATE a movie listing
router.put("/:id", (req,res)=>{

    const movieID = parseInt(req.params.id);
    const movieItem = movies.find(movie=>movie.id === movieID);
    const updatedMovieItem = req.body;
    
    if(movieItem)
    {
        res.json({
            message: `Movie with ID:${movieID} was successfully updated.`,
            data: movieItem
        })
    }
})

module.exports = router;