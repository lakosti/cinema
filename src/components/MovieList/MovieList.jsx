import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.movieWrap}>
      {movies !== null &&
        movies.map((item) => (
          <li className={css.movieItem} key={item.id}>
            <Link state={location} to={`/movies/${item.id}`}>
              <img
                className={css.movieImg}
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.original_title}
              />
              <p className={css.movieTitle}> {item.original_title}</p>
              <div className={css.movieOverlay}></div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default MovieList;
