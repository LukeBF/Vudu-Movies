// Import model layer
const { getAMovie } = require("../model/MovieModel.js");
const movieModel = require("../model/MovieModel.js")

exports.getMovieListing = (req,res)=>{
    
    res.json({
        message: "List of all movies",
        total: movieModel.getAllMovies().length,
        data: movieModel.getAllMovies()
    })

};

exports.getMovieItem = (req,res)=>{

    const id = parseInt(req.params.id)
    const foundMovie = movieModel.getMovie(id)
    
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
      
};

exports.createMovieItem = (req,res)=>{

    movieModel.createMovie(req.body)

    res.json({
        message: `The movie was successfully created.`,
        data: req.body
    })
    
};

exports.updateMovieItem = (req,res)=>{

    const movieID = parseInt(req.params.id);
    movieModel.updateMovie(movieID,req.body)
    
    
    res.json({
        message: `Movie with ID:${movieID} was successfully updated.`,
        data: req.body
    })

};

exports.deleteMovieItem = (req,res)=>{

    const movieID = parseInt(req.params.id);
    movieModel.deleteMovie(movieID)

    res.json({
        message: `Movie with ID:${movieID} was successfully deleted.`,
        data: req.body
    })

}