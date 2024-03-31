import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { requestProductById } from "../services/api";
import MovieCast from "../components/MovieCast/MovieCast";
import MovieReviews from "../components/MovieReviews/MovieReviews";
import { Instagram } from "react-content-loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const MyInstagramLoader = () => <Instagram />;

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const data = await requestProductById(movieId);
        setMovieDetails(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <div>
      {loading && <MyInstagramLoader />}
      {error && <ErrorMessage />}
      <Link to={backLinkRef.current}>Go back</Link>
      {movieDetails !== null && (
        <div>
          <p>{movieDetails.title}</p>
          <img
            src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <p>Rating: {movieDetails.vote_average}</p>
          <p>Date: {movieDetails.release_date}</p>
          <p>{movieDetails.overview}</p>
        </div>
      )}
      <div>
        <h3>Additional information</h3>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Rewiews</Link>

        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </div>
    </div>
  );
};

export default MovieDetailsPage;

// adult: false;
// backdrop_path: "/fFdlyeC8qPROUqM8ydR9INXAG17.jpg";
// genre_ids: (2)[(28, 53)];
// id: 359410;
// media_type: "movie";
// original_language: "en";
// original_title: "Road House";
// overview: "Ex-UFC fighter Dalton takes a job as a bouncer at a Florida Keys roadhouse, only to discover that this paradise is not all it seems.";
// popularity: 933.68;
// poster_path: "/bXi6IQiQDHD00JFio5ZSZOeRSBh.jpg";
// release_date: "2024-03-08";
// title: "Road House";
// video: false;
// vote_average: 7.27;
// vote_count: 572;
