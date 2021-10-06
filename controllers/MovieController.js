// Code copied from express documentation
const express = require('express')
const router = express.Router()

// Import data (from fake database) - moved to service
//const movieModel = require("../model/MovieModel.js")

// Import service layer
const movieService = require("../services/MovieService.js")

// Routes (Endpoints)
// GET list of all titles
router.get("/",movieService.getAllTitles)

//GET list of all movies
router.get("/allmovies",movieService.getAllMovies)

// GET list of all tv-shows
router.get("/tvshows",movieService.getAllShows)

// GET list of featured titles
router.get("/featured",movieService.getFeatured)

// GET movie by id
router.get("/:id",movieService.getMovieItem)

 //CREATE a new movie listing
 router.post("/",movieService.createMovieItem)

// Send a PUT request to UPDATE a movie listing
router.put("/:id",movieService.updateMovieItem)

// Delete a movie
router.delete("/:id",movieService.deleteMovieItem)

module.exports = router;