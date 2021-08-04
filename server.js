const movies = [
    {
        id: 1,
        title: "Movie 1",
        genre: "Thriller",
        image: "./img/poster.jpg",
        year: "2019",
        rating: "PG-13",
        length: "120 mins"
    },
    {
        id: 2,
        title: "Movie 2",
        genre: "Action",
        image: "./img/poster.jpg",
        year: "2018",
        rating: "R",
        length: "90 mins"
    },
    {
        id: 3,
        title: "Movie 3",
        genre: "Comedy",
        image: "./img/poster.jpg",
        year: "2021",
        rating: "PG-13",
        length: "120 mins"
    },
    {
        id: 4,
        title: "Movie 4",
        genre: "Animation",
        image: "./img/poster.jpg",
        year: "2021",
        rating: "G",
        length: "150 mins"
    },
    {
        id: 5,
        title: "Movie 5",
        genre: "Comedy",
        image: "./img/poster.jpg",
        year: "2021",
        rating: "G",
        length: "95 mins",
    }
]

const express = require("express")

const app = express();

app.use(express.json())

// Routes (Endpoints)
    app.get("/",(req,res)=>{
        
        // res.send("The movie endpoint")
        res.send("The root")
    })

    app.get("/movies",(req,res)=>{
        
        // this takes the JavaScript object and converts it into json 
        res.json({
        message: "List of movies",
        total: movies.length,
        data: movies,
        })

    })

    app.get("/movies/:id", (req,res)=>{

        //let foundMovie = null;
        const movieID = parseInt(req.params.id)
        
        const foundMovie = movies.find(movie=>movie.id === movieID)

        
        if(foundMovie != undefined)
        {
            res.json({
                message: `Movie was found with ID:${foundMovie.id}`,
                data: foundMovie
            })
        }
        else
        {
            res.status(404).json({
                message: `The was no movie found with ID:${movieID}`
            })
        }

        /**
         *  for (let i=0; i<movies.length; i++)
            {
                if(movieID === movies[i].id)
                {
                    foundMovie = movies[i]
                    break;
                }
            }

            if(foundMovie == null)
            {
                res.status(404).json({
                    message: `No movie was found with ID:${movieID}`
                })
            }
            else
            {
                res.status(200).json({
                    message: `Movie selected with ID:${foundMovie.id}`,
                    data: foundMovie,
                })
            }
         */
        
    })

    app.post("/movies", (req,res)=>{

        movies.push(req.body);
        const movieTitle = req.body.title;
        res.json({
            message: `${movieTitle} was successfully added to the database.`,
            data: req.body
        })
    })

    app.put("/movies/:id", (req,res)=>{
       

        res.json({

            
        })
    })

    


const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})