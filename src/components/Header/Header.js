import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import AuthNav from "../AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import Navigation from "../Navigation";
import { authSelectors } from "../../redux/auth";
import styles from "./Header.module.css";
import fadeHeaderStyles from "../../fade/fadeHeader.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Navigation />
        <Typography variant="h6" className={classes.title}>
          <CSSTransition
            in={true}
            appear
            timeout={500}
            classNames={fadeHeaderStyles}
            unmountOnExit
          >
            <h1 className={styles.title}>Phonebook</h1>
          </CSSTransition>
        </Typography>
        {isAuthenticated ? <UserMenu /> : <AuthNav />}
      </Toolbar>
    </AppBar>
  );
}
