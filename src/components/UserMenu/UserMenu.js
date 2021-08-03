import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

import { authSelectors, authOperations } from "../../redux/auth";
import defaultAvatar from "./default-avatar.png";
import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const userName = useSelector(authSelectors.getUserName);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(authOperations.logout());
  }, [dispatch]);

  return (
    <>
      <img
        src={defaultAvatar}
        alt="avatar"
        className={styles.avatar}
        width="35"
      />
      <span className={styles.user}>Welcome, {userName}</span>
      <Button variant="contained" onClick={onLogout} size="small">
        Logout
      </Button>
    </>
  );
}
