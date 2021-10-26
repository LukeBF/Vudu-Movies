// Import model layer
const movieModel = require("../model/MovieModel.js")

// Import AWS
const AWS = require('aws-sdk');
const { S3 } = require("aws-sdk");

// Add/create a new movie/tv-show
exports.createMovieItem = (req,res)=>{

    //Linking Amazon S3 bucket to store images
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY
    })

    const newData = req.body;

    //Create a new document in the DB
    const newMovie = new movieModel(newData)

    newMovie.save() //triggers a promise

    .then((movie)=>{ //movie is the inserted document

        // Setting up S3 upload parameters
        const params = {
            Bucket: process.env.AWS_MOVIES_BUCKET_NAME,
            Key: req.files.imgPath.name, // File name you want to save as in S3
            Body: req.files.imgPath.data
        };

        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }

            newMovie.imgPath = data.Location
            newMovie.save()

            .then((movie)=>{
                res.json({
                    message: "The movie was successfully added",
                    data: movie
                })
            });
            

            console.log(`File uploaded successfully.${data.Location}`);
        });

    })
    .catch(err=>{

        res.status(500).json({
            message: `Error: ${err}`
        })
    
    })
};

// Get all movies from the DB
exports.getAllTitles = (req,res)=>{

    movieModel.find() //returns an array of documents
    .or([{type:"movies"},{type:"tv-shows"}])
    // .limit(3)
    // .sort({release :-1})
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

// Get all TV-Shows
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

// Get featured titles
exports.getFeatured = (req,res)=>{
    
    // const fnName = "Featured"
    // console.log(fnName);

    movieModel.find({isFeatured:true,type:"movies"}) //returns an array of documents
    .then((movies)=>{
        res.json({
            message: "List of all featured movies",
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

exports.getFeaturedTv = (req,res)=>{

    movieModel.find({isFeatured:true,type:"tv-shows"}) //returns an array of documents
    .then((movies)=>{
        res.json({
            message: "List of all featured TV-Shows",
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

// Get a single movie
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

// Update a single movie
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
};

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

};