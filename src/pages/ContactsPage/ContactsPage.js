import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Container from "../../components/Container";
import Form from "../../components/Form";
import Filter from "../../components/Filter";
import ContactList from "../../components/ContactList";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import fadeStyles from "../../fade/fadeFilter.module.css";
import { operations, selectors } from "../../redux/phonebook";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectors.getContacts);
  const isLoading = useSelector(selectors.getLoading);
  const error = useSelector(selectors.getError);

  const renderFilter = contacts.length > 0;

  useEffect(() => {
    dispatch(operations.fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <Form />

      <CSSTransition
        in={renderFilter}
        timeout={250}
        classNames={fadeStyles}
        unmountOnExit
      >
        <Filter />
      </CSSTransition>

      {isLoading && <Loader />}
      {error && <Error />}

      <CSSTransition
        in={true}
        appear
        timeout={500}
        classNames={fadeStyles}
        unmountOnExit
      >
        <ContactList />
      </CSSTransition>
    </Container>
  );
}
