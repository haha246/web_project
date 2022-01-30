import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { useAuthState } from "../../context";

import { useStyles } from "./AppBar.css";

import { useAuthDispatch } from "../../context";

import useAuth from "../../core/userAuth";
import useRecipe from "../../core/useRecipe";

export default function App() {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const dispatch = useAuthDispatch();
  const { userLogout } = useAuth(dispatch);
  const { searchRecipe } = useRecipe(dispatch);
  const userState = useAuthState();

  const logout = () => {
    userLogout();
    const { from } = location.state || { from: { pathname: "/" } };
    history.push(from);
  };

  const search = (event) => {
    if (event.key === "Enter") {
      searchRecipe(event.target.value);
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <NavLink to="/">Paradise</NavLink>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Recipe..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onKeyDown={search}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {userState && userState.user ? (
              <>
                <Button>
                  <NavLink to="/recipe">+ Recipe</NavLink>
                </Button>
                <Button onClick={() => logout()}>Logout</Button>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => history.push({ pathname: "/personal" })}
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <Button>
                  <NavLink to="/game">Game</NavLink>
                </Button>
                <Button color="inherit">
                  <NavLink to="/signup">Sign Up</NavLink>
                </Button>
                <Button color="inherit">
                  <NavLink to="/login">Login</NavLink>
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
