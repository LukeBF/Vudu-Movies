const fs=require ("fs")

const movieModel = 
{
    moviesDB: [
        {
            id: 1,
            title: "Movie 1",
            genre: "Thriller",
            poster_path: "./img/poster.jpg",
            release_date: "14/2/2019",
            rating: "PG-13",
            length: "120 mins"
        },
        {
            id: 2,
            title: "Movie 2",
            genre: "Action",
            poster_path: "./img/poster.jpg",
            release_date: "7/11/1982",
            rating: "R",
            length: "90 mins"
        },
        {
            id: 3,
            title: "Movie 3",
            genre: "Comedy",
            poster_path: "./img/poster.jpg",
            release_date: "21/8/2017",
            rating: "PG-13",
            length: "120 mins"
        },
        {
            id: 4,
            title: "Movie 4",
            genre: "Animation",
            poster_path: "./img/poster.jpg",
            release_date: "28/5/2020",
            rating: "G",
            length: "150 mins"
        },
        {
            id: 5,
            title: "Movie 5",
            genre: "Comedy",
            poster_path: "./img/poster.jpg",
            release_date: "10/4/2017",
            rating: "G",
            length: "95 mins",
        }
    ],

    getAllMovies()
    {
        return this.moviesDB;
    },

    getMovie(id)
    {
        return this.moviesDB.find(movie=>movie.id === id);
    },

    createMovie(movie)
    {
        return this.moviesDB.push(movie);
    },

    updateMovie(id,movie)
    {
        const foundMovie = this.moviesDB.find(movie=>movie.id === id)
        console.log(foundMovie)

        foundMovie.title = movie.title
        foundMovie.genre = movie.genre
        foundMovie.poster_path = movie.poster_path
        foundMovie.release_date = movie.release_date
        foundMovie.rating = movie.rating
        foundMovie.length = movie.length

        return foundMovie

    },

    deleteMovie(id)
    {
        const newMovieList = this.moviesDB.filter(movie=>movie.id !== id)
        
        return this.moviesDB = newMovieList

        
    }

}

module.exports = movieModel;