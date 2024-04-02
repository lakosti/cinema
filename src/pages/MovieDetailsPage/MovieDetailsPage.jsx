import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { requestProductById } from "../../services/api";
import { Instagram } from "react-content-loader";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../../components/MovieReviews/MovieReviews"));

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
        <div className={css.detailWrap}>
          <div className={css.imgWrap}>
            <img
              className={css.detailImg}
              src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
            <p className={css.detailRating}>{Math.round(movieDetails.vote_average)}</p>
          </div>
          <div>
            <p className={css.detailTitle}>{movieDetails.title}</p>

            <p className={css.detailDate}>Date: {movieDetails.release_date}</p>
            <p className={css.detailDesc}> Description: {movieDetails.overview}</p>
          </div>
        </div>
      )}
      <div>
        <h3 className={css.additionalInfo}>Additional information</h3>
        <Link className={css.cast} to="cast">
          Cast
        </Link>
        <Link className={css.review} to="reviews">
          Rewiews
        </Link>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
