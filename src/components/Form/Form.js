import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Button from "@material-ui/core/Button";

import Notification from "../Notification";
import { operations, selectors } from "../../redux/phonebook";

import styles from "./Form.module.css";
import fadeStyles from "../Notification/fadeNotification.module.css";

export default function Form() {
  const [isContactExists, setIsContactExists] = useState(false);
  const [user, setUser] = useState({
    name: "",
    number: "",
  });

  const dispatch = useDispatch();
  const savedContacts = useSelector(selectors.getContacts);

  const handleChange = useCallback((e) => {
    const { name, value } = e.currentTarget;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }, []);

  const { name, number } = user;

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const normalizedName = name.toLowerCase();

      if (
        savedContacts.find((contact) =>
          contact.name.toLowerCase().includes(normalizedName)
        )
      ) {
        setIsContactExists(true);

        setTimeout(() => {
          setIsContactExists(false);
        }, 2500);

        return;
      }

      dispatch(operations.addContact(user));

      resetForm();
    },
    [dispatch, user, name, savedContacts]
  );

  const resetForm = () => {
    setUser({ name: "", number: "" });
    setIsContactExists(false);
  };

  return (
    <div className={styles.thumb}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form__container}>
          <label className={styles.label}>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              className={styles.input}
              onChange={handleChange}
              value={name}
            />
          </label>

          <label className={styles.label}>
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              className={styles.input}
              onChange={handleChange}
              value={number}
            />
          </label>
        </div>

        <div className={styles.button__container}>
          <Button type="submit" variant="contained" color="primary">
            Add contact
          </Button>
        </div>
      </form>

      <CSSTransition
        in={isContactExists}
        timeout={250}
        classNames={fadeStyles}
        unmountOnExit
      >
        <Notification name={name} />
      </CSSTransition>
    </div>
  );
}
