// Import model layer
const { getAMovie } = require("../model/MovieModel.js");
const movieModel = require("../model/MovieModel.js")

exports.createMovieItem = (req,res)=>{

    const newData = req.body;

    //Create a new document in the DB
    const newMovie = new movieModel(newData)

    newMovie.save() //triggers a promise

    .then((movie)=>{ //movie is the inserted document

        res.json({
            message: "The movie was successfully added",
            data: movie
        })
    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`
        })
    
    })
};

exports.getMovieListing = (req,res)=>{

    movieModel.find() //returns an array of documents
    .then((movies)=>{

        res.json({
            message: "List of all movies in the database",
            data: movies,
            total: movies.length
        })
    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`,
        })

    })
    

};


exports.getMovieItem = (req,res)=>{

    movieModel.findById(req.params.id)

    .then((movie)=>{

        if(movie)
        {
            res.json({
                message: `A movie was found with ID:${req.params.id}`,
                data: movie
            })
        }
        else
        {
            res.status(404).json({
                message: `No movie was found with ID:${req.params.id}`,
            })
        }
        
    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`,
        })

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

};