import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelectors } from "../../redux/auth";

export default function PrivateRoute({ redirectTo, children, ...routeProps }) {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <Route {...routeProps}>
      {isAuthenticated ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}
