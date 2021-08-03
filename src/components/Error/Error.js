import { useSelector } from "react-redux";
import styles from "./Error.module.css";
import { selectors } from "../../redux/phonebook";

export default function Error() {
  const errorMessage = useSelector(selectors.getError);

  return (
    <>
      <h2 className={styles.message}>
        Ooops! Something went wrong. Please try again later.
      </h2>
      <p className={styles.error__descr}>{errorMessage}</p>
    </>
  );
}
