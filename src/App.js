import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";

import Header from "./components/Header";
import Loader from "./components/Loader";
import PrivateRoute from "./components/UserMenu/PrivateRoute";
import PublicRoute from "./components/UserMenu/PublicRoute";
import { authOperations } from "./redux/auth";

import "./common.css";

const HomePage = lazy(() =>
  import("./pages/HomePage" /* webpackChunkName: "home-page" */)
);
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage" /* webpackChunkName: "register-page" */)
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage" /* webpackChunkName: "login-page" */)
);
const ContactsPage = lazy(() =>
  import("./pages/ContactsPage" /* webpackChunkName: "contacts-page" */)
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Header />

      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute exact path="/">
            <HomePage />
          </PublicRoute>

          <PublicRoute path="/register" restricted redirectTo="/contacts">
            <RegisterPage />
          </PublicRoute>

          <PublicRoute path="/login" restricted redirectTo="/contacts">
            <LoginPage />
          </PublicRoute>

          <PrivateRoute path="/contacts" redirectTo="/login">
            <ContactsPage />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </>
  );
}
