import {useState, useEffect} from "react";
import NavBar from './NavBar.jsx';
import Main from './Main1.jsx';
import NumResults from "./NumResults.jsx";
import Logo from './Logo.jsx';
import Search from './Search.jsx';
import Box from './Box.jsx';
import MovieList from "./MovieList.jsx";
import WatchedSummary from "./WatchedSummary.jsx";
import WatchedList from "./WatchedList.jsx";
import Loading from "./Loading.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import MovieDetails from "./MovieDetails.jsx";

// “I understood your request, but the result is invalid”

// Example from OMDb:

// {
//   "Response": "False",
//   "Error": "Movie not found!"
// }


const KEY = "62b5dcb1";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function App(){
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const tempQuery = "interstellar";
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie(){
    setSelectedId(null);
  }


    // useEffect(function() {
    //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s="harry"`)
    //   .then((res) => res.json())
    //   .then((data) => setMovies(data.Search))
    // }, []);

    // useEffect(function() {
    //   async function fetchMovies() {
    //     setIsLoading(true);
    //     const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s="harry"`)
    //     const data = await res.json();
    //     setMovies(data.Search);
    //     console.log(data.Search);
    //     setIsLoading(false);
    //   }
    //   fetchMovies();
    // }, []);

    useEffect(function() {
      async function fetchMovies() {
        try{
          setIsLoading(true);
          setError("");
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

          if(!res.ok){
            throw new Error("Something went wrong with fetching movies");
          }
          const data = await res.json();
         
          if(data.Response === "False") throw new Error("Movie not found");
          
          setMovies(data.Search);
          console.log(data.Search);
      } 
      
      catch (err) {
          setError(err.message);
      }
      
      finally {
           setIsLoading(false);
      }
    }

      if(query.length<3){
        setMovies([]); //so that movies array do not contain any old data 
        setError(""); //so that error has no previous error
        return;
      }

      fetchMovies();
    }, [query]);


  return (
    <>
   <NavBar>
      <Logo/>
      <Search query = {query} setQuery = {setQuery}/>
      <NumResults movies = {movies}/>
   </NavBar>
   <Main>
      <Box>
        {/* {isLoading ? <Loading /> : <MovieList movies = {movies}/>} */}
        {isLoading && <Loading/>}
        {!isLoading && !error && <MovieList movies = {movies} onSelectMovie = {handleSelectMovie}/>}
        {error && <ErrorMessage message = {error} />}
      </Box>

      <Box>
        {
          selectedId ? (<MovieDetails selectedId={selectedId} onCloseMovie = {handleCloseMovie}/> ) : (
          <>
          <WatchedSummary watched = {watched}/>
          <WatchedList watched = {watched}/>
          </>
        )}
      </Box>
   </Main>
    </>
  )
}

export default App;

// import StarRating from './StarRating.jsx';

// function App(){
//   return(
//     <>
//         <StarRating maxRating = {5} messages = {['Very Bad', 'Awful', 'Average', 'Good', 'Amazing']}/>
//         <StarRating color = "green"/>
//         <StarRating maxRating = {5}/>
//         <StarRating color = "blue"/>
//     </>
//   );
// }

// export default App;
