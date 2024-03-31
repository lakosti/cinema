import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map((item) => (
        <li key={item.id}>
          <Link state={location} to={`/movies/${item.id}`}>
            {item.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
