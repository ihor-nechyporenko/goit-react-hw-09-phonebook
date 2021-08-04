import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

import { authOperations } from "../../redux/auth";
import Container from "../../components/Container";
import styles from "../LoginPage/LoginPage.module.css";

export default function RegisterPage() {
  const [user, setUser] = useState({
    name: "",
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
      dispatch(authOperations.register(user));

      setUser({
        name: "",
        email: "",
        password: "",
      });
    },
    [dispatch, user]
  );

  const { name, email, password } = user;

  return (
    <Container>
      <div className={styles.thumb}>
        <h2 className={styles.title}>Registration</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="text"
              name="name"
              required
              value={name}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              name="email"
              required
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
              value={password}
              onChange={handleChange}
            />
          </label>
          <div className={styles.button__container}>
            <Button type="submit" variant="contained" color="primary">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
