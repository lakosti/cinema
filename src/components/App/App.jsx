import { NavLink, Route, Routes } from "react-router-dom";
import css from "./App.module.css";
import clsx from "clsx";
import HomePage from "../../pages/HomePage";
import MovieDetailsPage from "../../pages/MovieDetailsPage";

function App() {
  const getNavLinkClassNames = ({ isActive }) =>
    clsx(css.headerLink, {
      [css.active]: isActive,
    });

  return (
    <>
      <header className={css.header}>
        <NavLink className={getNavLinkClassNames} to="/">
          Home
        </NavLink>
        <NavLink className={getNavLinkClassNames} to="/movies">
          Movies
        </NavLink>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
