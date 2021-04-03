import {
  Typography,
  Divider,
  Paper,
  Avatar,
  IconButton,
} from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import Grid from '@material-ui/core/Grid/Grid';
import { FilterDrama } from '@material-ui/icons';
import React from 'react';
import RoomList from '../RoomList/RoomList';
import useStyles from './SidebarChat.styles';
import GitHubIcon from '@material-ui/icons/GitHub';

const SidebarChat = () => {
  const classes = useStyles();
  return (
    <Grid container direction='column' style={{ height: '100%' }}>
      <Box display='flex' className={classes.logoContainer}>
        <FilterDrama className={classes.logo} />
        <span className={classes.logoText}>Azure Cloud Chat</span>
      </Box>
      <Paper className={classes.userDetailsContainer} elevation={0}>
        <Box mb={2}>
          <Avatar>SD</Avatar>
        </Box>
        <Typography variant='subtitle1'>Hello, Sebastian</Typography>
      </Paper>
      <Box>Current room:</Box>
      <Box>Public</Box>
      <RoomList title='Rooms' />
      <Divider />
      <RoomList title='Private Rooms' />
      <Box
        mt='auto'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='subtitle2' style={{ fontSize: '16px' }}>
          Check repo here
        </Typography>
        <IconButton>
          <GitHubIcon />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default SidebarChat;
