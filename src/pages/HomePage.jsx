import { useEffect, useState } from "react";
import { requestMovies } from "../services/api";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const data = await requestMovies();
        setMovies(data.results);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies !== null && (
        <ul>
          {movies.map(({ title, id }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
              {/* <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} /> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
