import PropTypes from "prop-types";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectors, changeFilter } from "../../redux/phonebook";
import styles from "./Filter.module.css";

export default function Filter() {
  const value = useSelector(selectors.getFilter);
  const dispatch = useDispatch();

  const onChange = useCallback(
    (e) => {
      dispatch(changeFilter(e.currentTarget.value));
    },
    [dispatch]
  );

  return (
    <div className={styles.thumb}>
      <h2 className={styles.title}>Contacts</h2>
      <label className={styles.label}>
        Find contacts by name
        <input
          type="text"
          className={styles.input}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

Filter.defaultProps = {
  value: "",
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
