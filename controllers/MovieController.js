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
<<<<<<< HEAD
router.put("/:id", movieService.updateMovieItem)

// Delete a movie
router.delete("/:id", movieService.deleteMovieItem)
=======
router.put("/:id",movieService.updateMovieItem)
>>>>>>> 17cb8d39f8c7306584f0b781dea7eea3e2a49fb3

module.exports = router;