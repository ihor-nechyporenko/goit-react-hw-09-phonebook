import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelectors } from "../../redux/auth";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <nav>
      <ul className={styles.nav__list}>
        <li>
          <NavLink
            to="/"
            className={styles.nav__link}
            activeClassName={styles.nav__link__active}
            exact
          >
            Home
          </NavLink>
        </li>
        <li>
          {isAuthenticated && (
            <NavLink
              to="/contacts"
              className={styles.nav__link}
              activeClassName={styles.nav__link__active}
            >
              Contacts
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
