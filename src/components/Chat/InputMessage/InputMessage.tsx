import { Box, IconButton, styled, TextField } from '@material-ui/core';
import React, { ChangeEvent, KeyboardEventHandler } from 'react';
import SendIcon from '@material-ui/icons/Send';
import useStyles from './InputMessage.styles';

const Input = styled(TextField)({
  background: '#fff',
  borderRadius: '5px',
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
});

type Props = {
  value: string;
  handleMessage: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: any) => void;
};

const InputMessage: React.FC<Props> = ({
  handleMessage,
  handleSubmit,
  value,
}) => {
  const classes = useStyles();
  return (
    <Box display='flex' width='100%' component='form'>
      <Input
        placeholder='Send message...'
        style={{ flex: 1 }}
        value={value}
        variant='outlined'
        onChange={handleMessage}
        onKeyPress={(event: any) =>
          event.key === 'Enter' ? handleSubmit(event) : null
        }
      />
      <IconButton onClick={handleSubmit} className={classes.sendIcon}>
        <SendIcon htmlColor='#ffffff' />
      </IconButton>
    </Box>
  );
};

export default InputMessage;
