import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import loginContext from '../context/login/loginContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        TECHBLOG
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: 'bold'
  },
}));

export default function SignIn(props) {

  const classes = useStyles();

  const logContext = useContext(loginContext);
    
  const  { login, auth, alert, resetAlert } = logContext;

  const [ credenciales, setCredenciales ] = useState({
    
    email: "",
    password: ""

  });

  useEffect(() => {
    
    if(auth){
      props.history.push('/');
    }
    
  }, [auth, props.history])

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credenciales);
  }

  const handleChange = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value
    })
  }

  const handleClose = () => {
    resetAlert();
  };


  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={alert.display} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose} autoHideDuration={6000}>
        <Alert severity='error'>
          {alert.msg}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
        </form>
      </div>
      <Link href="/register" variant="body2">
        Registrarse
      </Link>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}