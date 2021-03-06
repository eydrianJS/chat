import Box from '@material-ui/core/Box/Box';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import { Link } from 'react-router-dom';
import { displayErrorInput } from '../../shared/functions/displayErrorInput';
import routeBuilders from '../../shared/routeBuilders';
import * as Yup from 'yup';
import useStyles from '../../shared/styles/Auth.styles';
import { useFormik } from 'formik';
import { useCallback } from 'react';

const Login = () => {
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
    console.log(requestData);
  }, []);

  return (
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
      <Button
        color='primary'
        variant='contained'
        size='large'
        className={classes.button}
        disableElevation
        disabled={!(formik.isValid && formik.dirty)}
      >
        Login
      </Button>
      <Box className={classes.registerDescription}>
        You don't have account?
        <Link to={routeBuilders.register()} className={classes.link}>
          Sign up here
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
