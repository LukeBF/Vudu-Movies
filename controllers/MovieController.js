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

/**
 * @description get all movies
 * @method GET /allmovies
 */
router.get("/allmovies",movieService.getAllMovies)

/**
 * @description get all tv-shows
 * @method GET /tvshows
 */
router.get("/tvshows",movieService.getAllShows)

/**
 * @description get all featured
 * @method GET /featured
 */
router.get("/featured",movieService.getFeatured)

/**
 * @description get featured tv shows
 * @method GET /featured
 */
 router.get("/featured/tvshows",movieService.getFeaturedTv)

/**
 * @description get a single item from the movies DB by ID
 * @method GET /:id
 */
router.get("/:id",movieService.getMovieItem)

 /**
 * @description add/create a new item in the movies DB
 * @method POST /*ROOT*
 */
 router.post("/",movieService.createMovieItem)

/**
 * @description update a single movie item in the DB
 * @method PUT /:id
 */
router.put("/:id",movieService.updateMovieItem)

// Delete a movie
/**
 * @description delete a single movie from the DB
 * @method DELETE /:id
 */
router.delete("/:id",movieService.deleteMovieItem)

module.exports = router;