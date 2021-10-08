// Import model layer
// const { getAMovie } = require("../model/MovieModel.js");
const movieModel = require("../model/MovieModel.js")


// Create a new movie/tv-show
exports.createMovieItem = (req,res)=>{

    const aws = require("aws-sdk")
    const s3 = new aws.s3({accessKeyId:process.env.AWS_ID,secretAccessKey:process.env.AWS_SECRET_KEY})

    const newData = req.body;

    //Create a new document in the DB
    const newMovie = new movieModel(newData)

    newMovie.save() //triggers a promise

    .then((movie)=>{ //movie is the inserted document
        const params = {
            Bucket: process.env.MOVIES_BUCKET,
            Key: req.files.img.name,
            Body:req.files.img.data
        };
        
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            } 
            
            newMovie.imgPath=data.location
            newMovie.save()

            .then(movie=>{
                res.json({
                    message: "The movie was successfully added",
                    data: movie
        
                })
            })
                        
        })
    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`
        })
    
    })
}

// Get ALL titles
exports.getAllTitles = (req,res)=>{

    movieModel.find() //returns an array of documents
    .or([{type:"movies"},{type:"tv-shows"}])
    .then((movies)=>{
        res.json({
            message: "List of all titles in the database",
            data: movies,
            total: movies.length
        })
    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`,
        })
    })
}

// Get ALL movies
exports.getAllMovies = (req,res)=>{

    movieModel.find({type:"movies"}) //returns all movies
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
}

// Get ALL TV-Shows
exports.getAllShows = (req,res)=>{

    movieModel.find({type:"tv-shows"}) //returns all tv-shows
    .then((movies)=>{
        res.json({
            message: "List of all tv-shows in the database",
            data: movies,
            total: movies.length
        })
    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`,
        })
    })
}

// Get Featured titles
exports.getFeatured = (req,res)=>{

    movieModel.find({isFeatured:true,type:"movies"}) //returns an array of documents
    .then((movies)=>{
        res.json({
            message: "List of all featured titles",
            data: movies,
            total: movies.length
        })
    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`,
        })
    })
}


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
      
}

exports.updateMovieItem = (req,res)=>{

    // const movieID = parseInt(req.params.id);
    const updatedMovie = req.body

    // movieModel.findByIdAndUpdate({id:movieID},req.body,{new:true})
    movieModel.findByIdAndUpdate(req.params.id,updatedMovie,{new:true})

    .then((movie)=>{
        
        if(movie)
        {
            res.json({
                message: `Movie with ID:${req.params.id} was successfully updated.`,
                data: movie
            })
        }
        else
        {
            res.status(404).json({
                message: `Item with ID: ${req.params.id} not found`
            })
        }
    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`,
        })

    })

}

exports.deleteMovieItem = (req,res)=>{

    // const movieID = parseInt(req.params.id);

    movieModel.findByIdAndRemove(req.params.id)

    .then((movie)=>{
        
        if(movie)
        {
            res.json({
                message: `Movie with ID:${req.params.id} was successfully deleted.`,
            })
        }
        else
        {
            res.status(404).json({
                message: `Item with ID: ${req.params.id} not found`
            })
        }
    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`,
        })

    })

}