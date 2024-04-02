import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { requestMovieByQuery } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, SetSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    if (searchQuery === "" || searchQuery === null) return;

    async function fetchDataByQuery() {
      try {
        setLoading(true);
        setError(false);

        const data = await requestMovieByQuery(searchQuery);
        if (data.results.length === 0) {
          alert("No results found");
          return;
        }
        setMovies(data.results);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchDataByQuery();
  }, [searchQuery]);

  const handleSearchFilm = (values) => {
    setMovies([]);
    SetSearchParams({ query: values.query });
  };

  return (
    <>
      <Formik initialValues={{ query: searchQuery ?? "" }} onSubmit={handleSearchFilm}>
        <Form className={css.form}>
          <Field className={css.input} placeholder="Search film" type="text" name="query" />
          <button className={css.button} type="submit">
            Seacrh
          </button>
        </Form>
      </Formik>
      {loading && <p className={css.loadingText}>Loading, please wait...</p>}
      {error && <p className={css.errorText}>Oops, something went wrong!</p>}
      <MovieList movies={movies} />
    </>
  );
};

export default MoviesPage;
