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

export default function SignUp(props) {

  const classes = useStyles();

  const logContext = useContext(loginContext);
    
  const  { login, auth, resetAlert } = logContext;

  const [ alert, setAlert ] = useState({
    msg: '',
    display: false
  });

  const [ datos, setDatos ] = useState({
    
    name: "",
    email: "",
    password: "",
    phone: ""

  });

  useEffect(() => {
    
    if(auth){
      props.history.push('/');
    }
    
  }, [auth, props.history])

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
            
        const api_url = `${process.env.REACT_APP_SERVER_URL}/api/auth/register`;

        const responseRegister = await fetch(api_url, { method: 'POST',
                                                    headers: {'Content-Type': 'application/json'},
                                                    body: JSON.stringify(datos)});
        const resultRegister = await responseRegister.json();

        if(resultRegister.status === 400){

          setAlert({
            ...alert,
            ['msg']: resultRegister.errors.email[0],
            ['display']: true
          });

        }else{
          //Redireccionar al login si el registro fue exitoso.
          if(resultRegister.status === 201){
            props.history.push('/login')
          }
        };

        

    } catch (error) {
        console.log(error);
    }
    
  }

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  const handleClose = () => {
    setAlert({
      ...alert,
      ['msg']: '',
      ['display']: false
    });
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
          Registro
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                autoComplete="name"
                onChange={handleChange}
                autoFocus
            />
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
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Teléfono"
                name="phone"
                autoComplete="phone"
                onChange={handleChange}
                autoFocus
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Registrarse
            </Button>
        </form>
      </div>
      <Link href="/login" variant="body2">
        Regresar al Login
      </Link>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}