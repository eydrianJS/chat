import React from 'react';
import { IMessageResponse } from '../../../../shared/interfaces/IMessageResponse';
import { useStyles } from './SingleMessage.styles';
import AdbIcon from '@material-ui/icons/Adb';
import { Avatar, Box } from '@material-ui/core';

type Props = {
  message: IMessageResponse;
};

const getTwoFirstLetters = (name: string) => name.substr(0, 2).toUpperCase();

const SingleMessage: React.FC<Props> = ({ message: { text, username, time } }) => {
  const isSentByCurrentUser = true;
  const classes = useStyles();

  let message;

  switch (username) {
    case 'Chat Bot ':
      message = (
        <Box
          className={`${classes.messageContainer} ${classes.justifyCenter}`}
          style={{ color: '#000', fontWeight: 700, margin: '1rem 0' }}
        >
          <Box className={classes.alignItems}>
            <AdbIcon />
            <span>{text}</span>
          </Box>
        </Box>
      );
      break;
    case 'bastek338':
      message = (
        <Box my={2}>
          <Box className={`${classes.messageContainer} ${classes.justifyEnd}`}>
            <Box order={2} pl={2}>
              <Avatar>{getTwoFirstLetters(username)}</Avatar>
            </Box>
            <Box className={`${classes.messageBox} ${classes.lightBackground}`} order={1}>
              {text}
            </Box>
          </Box>
          <Box display="flex" className={classes.justifyEnd} pr={7}>
            {time}
          </Box>
        </Box>
      );
      break;
    default:
      message = (
        <>
          <Box className={`${classes.messageContainer} ${classes.justifyStart}`}>
            <Box style={{ color: 'black' }}>
              {username} {time}
            </Box>
          </Box>
          <Box className={`${classes.messageContainer} ${classes.justifyStart}`}>
            <Box className={`${classes.messageBox} ${classes.darkBackground}`}>{text}</Box>
          </Box>
        </>
      );
      break;
  }
  return message;
};

export default SingleMessage;
