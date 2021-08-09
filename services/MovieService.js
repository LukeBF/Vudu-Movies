// Import movieModel
const movieModel = require("../model/MovieModel.js")

exports.getMovieListing = (req,res)=>{
    
    res.json({
        message: "List of all movies",
        total: movieModel.getAllMovies().length,
        data: movieModel.getAllMovies()
    })

};

exports.getSingleMovie = (req,res)=>{

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
      
};

exports.createMovieItem = (req,res)=>{

    movieModel.createAMovie(req.body)

    res.json({
        message: `The movie was successfully created.`,
        data: req.body
    })
    
}