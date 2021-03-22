import Grid from '@material-ui/core/Grid/Grid';
import React from 'react';
import useStyles from './Chat.styles';
import ChatRoom from './ChatRoom/ChatRoom';
import SidebarChat from './SidebarChat/SidebarChat';

const Chat = () => {
  const classes = useStyles();

  return (
    <Grid container alignItems='center'>
      <Grid item xs={12} style={{ height: '100%', padding: '5% 0' }}>
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={3} className={classes.sideBarContainer}>
            <SidebarChat />
          </Grid>
          <Grid item xs={9}>
            <ChatRoom />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Chat;
