import { NavLink } from "react-router-dom";
import css from "../App/App.module.css";
import clsx from "clsx";

const getNavLinkClassNames = ({ isActive }) =>
  clsx(css.headerLink, {
    [css.active]: isActive,
  });

const Navigation = () => {
  return (
    <div>
      <header className={css.header}>
        <NavLink className={getNavLinkClassNames} to="/">
          Home
        </NavLink>
        <NavLink className={getNavLinkClassNames} to="/movies">
          Movies
        </NavLink>
      </header>
    </div>
  );
};

export default Navigation;
