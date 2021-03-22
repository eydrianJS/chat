import { makeStyles } from '@material-ui/core';

export const globalColors = {
  main: '#17cc78',
}

const useStyles = makeStyles((theme) => ({
  authHeader: {
    fontWeight: 600,
    '& span': {
      color: '#028EB2',
    },
  },
  authSubHeader: {
    marginTop: theme.spacing(2),
    fontSize: '16px',
    fontWeight: 600,
    color: '#6f6f6f',
  },
  button: {
    marginTop: theme.spacing(2),
    width: 400,
    padding: theme.spacing(1.5),
  },
  formElementsContainer: {
    flex: 1,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 400,
    },
  },
  registerDescription: {
    marginTop: theme.spacing(3),
    fontSize: '20px',
    fontWeight: 500,
  },
  link: {
    marginLeft: theme.spacing(1),
    textDecoration: 'none',
    '&:hover': {
      color: '#2795f5',
    },
    '&:visited': {
      color: '#6e0dc9',
    },
  },
}));

export default useStyles;
