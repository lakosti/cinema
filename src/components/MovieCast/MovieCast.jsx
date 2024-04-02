import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestCastById } from "../../services/api";
import person from "../../assets/person.jpg";
import css from "./MovieCast.module.css";
const MovieCast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await requestCastById(movieId);
        setCast(data.cast);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [movieId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {cast.length === 0 ? (
        <p>No cast information available</p>
      ) : (
        <ul className={css.castWrap}>
          {cast.map((item) => (
            <li key={item.id}>
              <img
                className={css.castImg}
                src={
                  item.profile_path === null
                    ? person
                    : `https://image.tmdb.org/t/p/w300${item.profile_path}`
                }
                alt=""
              />
              <div className={css.castInfo}>
                <p>Name: {item.name}</p>
                <p>Character: {item.character === "" ? "Not found info" : item.character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
