import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { requestProductById } from "../services/api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const data = await requestProductById(movieId);

        console.log(data.results);
        setMovieDetails(data.results);
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
      {movieDetails !== null && <p>{movieDetails.title}</p>}
      {/* <div>
        <h3>Additional information</h3>
        <ul>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        </ul>
      </div> */}
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
