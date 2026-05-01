import {useEffect, useState} from "react";
import StarRating from './StarRating.jsx';
const KEY = "62b5dcb1";

function MovieDetails({ selectedId, onCloseMovie }){
    const [movie, setMovie] = useState({});

    //destructuring data out of this movie
    const {
        Title: title, 
        Year: year, 
        Poster: poster, 
        Runtime: runtime, 
        imdbRating, 
        Plot: plot, 
        Released: released, 
        Actors: actors, 
        Director: director, 
        Genre: genre,
    } = movie;

    // console.log(title, year, plot); now using it in our jsx

    useEffect(function(){
        async function getMovieDetails() {
           const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
           const data = await res.json();
            setMovie(data);
        }
        getMovieDetails();
    }, [selectedId])

    return (
        <div className = "details">
            <header>
                <button className = "btn-back" onClick = {onCloseMovie}>&larr;</button>
                <img src = {poster} alt = {`Poster of ${title} movie`}/>
                {/* <div className = "details">{selectedId}</div> */}
                <div className = "details-overview">
                    <h2>{title}</h2>
                    <p>{released} &bull; {runtime}</p>
                    <p>{genre}</p>
                    <p><span>⭐</span>{imdbRating} IMDb rating</p>
                </div>
            </header>

            <section>
                <p><em>{plot}</em></p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </div>
    );
}

export default MovieDetails;
