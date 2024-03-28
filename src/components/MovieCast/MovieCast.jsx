import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestCastById } from "../../services/api";

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
        console.log(data.cast);
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
      <ul>
        {cast.map((item) => (
          <li key={item.id}>
            <img src={`https://image.tmdb.org/t/p/w200${item.profile_path}`} alt="" />
            <p>Name: {item.name}</p>
            <p>Character : {item.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
