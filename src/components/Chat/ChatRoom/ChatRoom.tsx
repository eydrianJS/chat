import { Box, Button, Divider, Grid, Typography } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import InputMessage from '../InputMessage/InputMessage';
import Messages from '../Messages/Messages';
import useStyles from './ChatRoom.styles';
import io from 'socket.io-client';

let socket: SocketIOClient.Socket = io('localhost:8080', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

const ChatRoom = () => {
  const classes = useStyles();
  const [messageField, setMessageField] = useState('');
  const [messagesList, setMessagesList] = useState<any[]>([]);

  const handleMessage = (event: ChangeEvent<HTMLInputElement>) =>
    setMessageField(event.target.value);

  useEffect(() => {
    socket.on('chatHistory', (messages: any) => {
      console.log(messages);
      setMessagesList((messagesList) => [...messagesList, ...messages]);
    });
  }, []);

  useEffect(() => {
    socket.emit('joinToPublicRoom', { userId: '60571a776db2a42e1257abef' });
    socket.on('message', (obj: any) => console.log(obj));
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault() as React.SyntheticEvent;
    if (messageField) {
      socket.emit('chatMessage', messageField, () => setMessageField(''));
    }
  };

  console.log(messagesList);

  return (
    <Grid container direction='column' className={classes.chatRoomContainer}>
      <Grid item className={classes.infoBarContainer}>
        <Typography variant='h5' style={{ fontWeight: 700 }}>
          Fancy Room
        </Typography>
        <Box>
          <Button variant='outlined'>Participants</Button>
        </Box>
      </Grid>
      <Divider />
      <Grid item className={classes.chatRoomMessagesContainer}>
        {/* <Messages messages={messagesList} /> */}
      </Grid>
      <Grid item className={classes.messageContainer}>
        <InputMessage
          value={messageField}
          handleMessage={handleMessage}
          handleSubmit={handleSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default ChatRoom;
