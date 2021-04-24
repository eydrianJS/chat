import { Box, Button, Divider, Grid, Typography } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import InputMessage from '../InputMessage/InputMessage';
import Messages from '../Messages/Messages';
import useStyles from './ChatRoom.styles';
import io from 'socket.io-client';
import { IRoomResponse } from '../../../shared/interfaces/IRoomResponse';
import { IMessageResponse } from '../../../shared/interfaces/IMessageResponse';
import CreateRoomModal from '../../CreateRoomModal/CreateRoomModal';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { axios } from '../../../shared/configAxios';
import SingleMessage from '../Messages/SingleMessage/SingleMessage';

const a: string = process.env.REACT_APP_API_BASE_URL ?? '';
let socket: SocketIOClient.Socket = io(a, {
  transports: ['websocket', 'polling', 'flashsocket'],
});

const ChatRoom = () => {
  const classes = useStyles();
  const { roomId } = useParams<{ roomId: string }>();
  const [messageField, setMessageField] = useState('');
  const [messagesList, setMessagesList] = useState<IMessageResponse[]>([]);
  const [chatHistory, setChatHistoryList] = useState<any>([]);
  const [roomData, setRoomData] = useState<IRoomResponse | undefined>(undefined);

  const handleMessage = (event: ChangeEvent<HTMLInputElement>) =>
    setMessageField(event.target.value);

  useEffect(() => {
    // TODO add axtios for fetching rooms. pass to then sockets below.
    socket.on('chatHistory', (messages: IMessageResponse[]) => {
      setMessagesList((messagesList) => [...messagesList, ...messages]);
    });
    socket.on('roomUsers', (obj: IRoomResponse) => setRoomData(obj));
  }, []);

  useEffect(() => {
    const token: any = jwtDecode(localStorage.getItem('token') ?? '');
    socket.emit('joinToPublicRoom', { userId: token?.uid });
    socket.on('message', (messages: IMessageResponse) => {
      setMessagesList((messagesList) => [...messagesList, messages]);
    });
    socket.on('chatHisory', (messages: IMessageResponse) => {
      console.log('🚀 ~ file: ChatRoom.tsx ~ line 44 ~ socket.on ~ messages', messages);
      setChatHistoryList(messages);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/room/${roomId}`)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault() as React.SyntheticEvent;
    if (messageField) {
      console.log('🚀 ~ file: ChatRoom.tsx ~ line 67 ~ handleSubmit ~ messageField', messageField);
      socket.emit('chatMessage', messageField);
      setMessageField('');
    }
  };

  return (
    <Grid container direction="column" className={classes.chatRoomContainer}>
      <Grid item className={classes.infoBarContainer}>
        <Typography variant="h5" style={{ fontWeight: 700 }}>
          {roomData?.room}
        </Typography>
        <Box>
          <Button variant="outlined">Participants</Button>
        </Box>
      </Grid>
      <Divider />
      <Grid item className={classes.chatRoomMessagesContainer}>
        {chatHistory.map((msg: IMessageResponse) => {
          console.log('🚀 ~ file: ChatRoom.tsx ~ line 80 ~ {chatHistory.map ~ msg', msg);
          return <SingleMessage message={msg} />;
        })}
        <Messages messages={messagesList} />
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
