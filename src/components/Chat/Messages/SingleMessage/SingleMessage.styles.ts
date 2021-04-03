import { makeStyles } from '@material-ui/core';
import { globalColors } from '../../../../shared/styles/Auth.styles';

export const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '8px 0',
    color: '#fff',
  },
  messageBox: {
    display: 'block',
    maxWidth: '70%',
    fontSize: '16px',
    borderRadius: '10px',
    padding: theme.spacing(2, 2),
    wordWrap: 'break-word',
  },
  lightBackground: {
    background: globalColors.main,
  },
  darkBackground: {
    background: '#000',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignItems: {
    display: 'flex',
    alignItems: 'center',
  },
}));
