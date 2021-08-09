// Code copied from express documentation
const express = require('express')
const router = express.Router()

// Import data (from fake database) - move to service
//const movieModel = require("../model/MovieModel.js")

// Import service layer
const movieService = require("../services/MovieService.js")

// Routes (Endpoints)
// GET list of movies
router.get("/",movieService.getMovieListing)

// GET movie by id
router.get("/:id",movieService.getSingleMovie)

 //CREATE a new movie listing
 router.post("/",movieService.createMovieItem)

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