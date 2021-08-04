import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

import { authOperations } from "../../redux/auth";
import Container from "../../components/Container";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = useCallback((e) => {
    const { name, value } = e.currentTarget;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(authOperations.login(user));

      setUser({
        email: "",
        password: "",
      });
    },
    [dispatch, user]
  );

  const { email, password } = user;

  return (
    <Container>
      <div className={styles.thumb}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            E-mail
            <input
              className={styles.input}
              type="email"
              name="email"
              required
              autoComplete="off"
              value={email}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              name="password"
              required
              autoComplete="off"
              value={password}
              onChange={handleChange}
            />
          </label>

          <div className={styles.button__container}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
