import Box from '@material-ui/core/Box/Box';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import { Link, useHistory } from 'react-router-dom';
import { displayErrorInput } from '../../shared/functions/displayErrorInput';
import routeBuilders from '../../shared/routeBuilders';
import * as Yup from 'yup';
import useStyles from '../../shared/styles/Auth.styles';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Background from '../Background/Background';
import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  useAuth,
} from '../../context/authContext';
import { axios } from '../../shared/configAxios';
import { RequestStatus } from '../../shared/RequestStatus';
import AlertMessage from '../Alert/Alert';

const Login = () => {
  const { state, dispatch } = useAuth();
  const [openAlert, setOpenAlert] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: Yup.object({
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
    //TODO add here type for data when model will be ready.
    const requestData = {
      name: values.name,
      password: values.password,
    };
    onLoginHandler(requestData);
  }, []);

  const onLoginHandler = async (requestData: any) => {
    dispatch({ type: AUTH_REQUEST });
    axios
      .post('/login', requestData)
      .then((response) => {
        dispatch({ type: AUTH_SUCCESS, payload: response.data });
        history.push('/chat/room/public');
      })
      .catch((err) => {
        dispatch({ type: AUTH_FAILURE, payload: err });
        setOpenAlert(true);
      });
  };

  return (
    <>
      <Box className={classes.formElementsContainer} component='form'>
        <Box
          m={4}
          display='flex'
          justifyContent='flex-start'
          flexDirection='column'
        >
          <Typography variant='h4' className={classes.authHeader}>
            Sign in | <span>Azure Cloud Chat</span>
          </Typography>
          <p className={classes.authSubHeader}>
            Log in with your data that you entered during registration.
          </p>
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
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              formik.handleSubmit()
            }
            className={classes.button}
            disableElevation
            disabled={!(formik.isValid && formik.dirty)}
          >
            Login
          </Button>
        ) : (
          <CircularProgress />
        )}
        <Box className={classes.registerDescription}>
          You don't have account?
          <Link to={routeBuilders.register()} className={classes.link}>
            Sign up here
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

export default Login;
