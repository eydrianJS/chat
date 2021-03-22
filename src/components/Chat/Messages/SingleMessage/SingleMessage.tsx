import React from 'react';
import { useStyles } from './SingleMessage.styles';

type Props = {
  text: string;
};

const SingleMessage: React.FC<Props> = ({ text }) => {
  const isSentByCurrentUser = true;
  const classes = useStyles();
  return (
    <>
      <div className={`${classes.messageContainer} ${classes.justifyStart}`}>
        <div className={`${classes.messageBox} ${classes.darkBackground}`}>
          Hi mark!
        </div>
      </div>
      {isSentByCurrentUser ? (
        <div className={`${classes.messageContainer} ${classes.justifyEnd}`}>
          <div className={`${classes.messageBox} ${classes.lightBackground}`}>
            {text}
          </div>
        </div>
      ) : (
        <div>other messages</div>
      )}
    </>
  );
};

export default SingleMessage;
