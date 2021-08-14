// Code copied from express documentation
const express = require('express')
const router = express.Router()

// Import data (from fake database) - moved to service
//const movieModel = require("../model/MovieModel.js")

// Import service layer
const movieService = require("../services/MovieService.js")

// Routes (Endpoints)
// GET list of movies
router.get("/",movieService.getMovieListing)

// GET movie by id
router.get("/:id",movieService.getMovieItem)

 //CREATE a new movie listing
 router.post("/",movieService.createMovieItem)

// Send a PUT request to UPDATE a movie listing
router.put("/:id",movieService.updateMovieItem)

module.exports = router;