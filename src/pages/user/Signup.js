import React, { useState } from 'react';
import {
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAuthDispatch()
  const { userSignup } = useAuth(dispatch);

  const classes = useStyles();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorTextMap, setErrorTextMap] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  const signup = async () => {
    const errorText = {};
    let checkFail = false;
    if (nickname === '') {
      checkFail = true;
      errorText.nickname = 'Please enter nickname'
    }
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
    const data = await userSignup(nickname, email, password);
    if (data.msg) {
      setErrorTextMap({...errorTextMap, errorMessage: data.msg})
      setShowMessage(true);
    }
    if (data.isValid) {
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from)
    }
  }

  const onNicknameChange = event => {
    setNickname(event.target.value)
    setErrorTextMap({...errorTextMap, nickname: ''})
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
          Sign up
        </Typography>
        <div className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="nickname"
                variant="outlined"
                required
                fullWidth
                id="nickname"
                label="Nick Name"
                autoFocus
                helperText={errorTextMap.nickname}
                onChange={onNicknameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={errorTextMap.email}
                onChange={onEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={errorTextMap.password}
                onChange={onPasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signup}
          >
            Sign in
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={5}>
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
