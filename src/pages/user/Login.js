import React, { useState } from 'react';
import {
  Link,
  useHistory,
  useLocation
} from "react-router-dom";

import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';

import Copyright from '../../components/copyright/Copyright';

import { useAuthDispatch } from '../../context' 

import useAuth from '../../core/userAuth';
import { validateEmail } from '../../utils/validators';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAuthDispatch()
  const { userLogin } = useAuth(dispatch);

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorTextMap, setErrorTextMap] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  const login = async () => {
    const errorText = {};
    let checkFail = false;
    if (email === '') {
      checkFail = true;
      errorText.email = 'Please enter email'
    } else if (!validateEmail(email)) {
      errorText.email = 'Invalid email format, please check again'
    }
    if (password === '') {
      checkFail = true;
      errorText.password = 'Please enter password'
    }
    if (checkFail) {
      setErrorTextMap({...errorTextMap, ...errorText })
      return;
    }
    const data = await userLogin(email, password);
    if (data.msg) {
      setErrorTextMap({...errorTextMap, errorMessage: data.msg})
      setShowMessage(true);
    }
    if (data.isValid) {
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from)
    }
  }

  const onEmailChange = event => {
    setEmail(event.target.value)
    setErrorTextMap({...errorTextMap, email: ''})
  }

  const onPasswordChange = event => {
    setPassword(event.target.value)
    setErrorTextMap({...errorTextMap, password: ''})
  }

  const handleClose = () => {
    setShowMessage(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            helperText={errorTextMap.email}
            onChange={onEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            helperText={errorTextMap.password}
            onChange={onPasswordChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showMessage}
        onClose={handleClose}
        message={errorTextMap.errorMessage}
        autoHideDuration={2000}
        key="top-center"
      />
    </Container>
  );
}
