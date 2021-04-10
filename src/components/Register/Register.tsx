import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import Background from '../Background/Background';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import routeBuilders from '../../shared/routeBuilders';
import useStyles from '../../shared/styles/Auth.styles';
import * as Yup from 'yup';
import { displayErrorInput } from '../../shared/functions/displayErrorInput';
import { useCallback, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { axios } from '../../shared/configAxios';
import AlertMessage from '../Alert/Alert';
import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  useAuth,
} from '../../context/authContext';
import { RequestStatus } from '../../shared/RequestStatus';

const Register = () => {
  const classes = useStyles();
  const { state, dispatch } = useAuth();
  const [openAlert, setOpenAlert] = useState(false);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid.')
        .max(60, 'Email is too long'),
      name: Yup.string()
        .required('Name is required')
        .min(2, 'Name is to short')
        .max(25, 'Name is too long'),
      password: Yup.string()
        .required('Password is required')
        .min(5, 'Password is too short'),
    }),
    onSubmit: (values) => onSave(values),
  });

  const onSave = useCallback((values) => {
    dispatch({ type: AUTH_REQUEST });
    const requestData = {
      email: values.email,
      name: values.name,
      password: values.password,
    };
    axios
      .post('/register', requestData)
      .then((response) => {
        dispatch({ type: AUTH_SUCCESS, payload: response.data });
        history.push('/chat/room/public');
      })
      .catch((err) => {
        dispatch({ type: AUTH_FAILURE, payload: err });
        setOpenAlert(true);
      });
  }, []);

  return (
    <>
      <Box className={classes.formElementsContainer} component='form'>
        <Box m={4}>
          <Typography variant='h4' className={classes.authHeader}>
            Sign up | <span>Azure Cloud Chat</span>
          </Typography>
          <p className={classes.authSubHeader}>
            Sign up to chat with random people and have a lot of fun.
          </p>
        </Box>
        <Box>
          <TextField
            id='email'
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Enter your email...'
            error={displayErrorInput(formik.touched.email, formik.errors.email)}
            helperText={formik.errors.email}
            variant='outlined'
            required
          />
        </Box>
        <TextField
          id='name'
          name='name'
          label='Username'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={displayErrorInput(formik.touched.name, formik.errors.name)}
          helperText={formik.errors.name}
          placeholder='Enter your username...'
          variant='outlined'
          required
        />
        <TextField
          id='password'
          name='password'
          label='Password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={displayErrorInput(
            formik.touched.password,
            formik.errors.password
          )}
          helperText={formik.errors.password}
          placeholder='Enter your password...'
          variant='outlined'
          required
        />
        {!(state.status === RequestStatus.ongoing) ? (
          <Button
            color='primary'
            variant='contained'
            size='large'
            className={classes.button}
            onClick={() => formik.handleSubmit()}
            disableElevation
            disabled={!(formik.isValid && formik.dirty)}
          >
            Register
          </Button>
        ) : (
          <CircularProgress />
        )}
        <Box className={classes.registerDescription}>
          Do you have account?
          <Link to={routeBuilders.login()} className={classes.link}>
            Sign in
          </Link>
        </Box>
      </Box>
      <AlertMessage
        open={openAlert}
        handleClose={() => setOpenAlert(false)}
        duration={3000}
      />
      <Background />
    </>
  );
};

export default Register;
