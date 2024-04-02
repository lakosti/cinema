import { useEffect, useState } from "react";
import { requestMovies } from "../../services/api";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import css from "./HomePage.module.css";

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
    <div className={css.homeWrap}>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies !== null && (
        <ul className={css.movieWrap}>
          {movies.map(({ title, id, poster_path }) => (
            <li className={css.movieItem} key={id}>
              <Link className={css.movieLink} to={`/movies/${id}`}>
                <img
                  className={css.movieImg}
                  src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                  alt={title}
                />
                <p className={css.movieTitle}>{title}</p>
                <div className={css.movieOverlay}></div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
