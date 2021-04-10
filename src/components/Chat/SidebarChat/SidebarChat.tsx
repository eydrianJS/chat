import {
  Typography,
  Divider,
  Paper,
  Avatar,
  IconButton,
  Button,
} from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import Grid from '@material-ui/core/Grid/Grid';
import { FilterDrama } from '@material-ui/icons';
import { axios } from '../../../shared/configAxios';
import RoomList from '../RoomList/RoomList';
import useStyles from './SidebarChat.styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useEffect, useState } from 'react';
import CreateRoomModal from '../../CreateRoomModal/CreateRoomModal';
import AddIcon from '@material-ui/icons/Add';
import InviteUserModal from '../../InviteUserModal/InviteUserModal';
import { useAuth } from '../../../context/authContext';

const SidebarChat = () => {
  const classes = useStyles();
  const { state, dispatch } = useAuth();
  const [open, setOpen] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [roomList, setRoomList] = useState<any[]>([]);

  const handleOpenInviteModal = () => {
    setOpenInviteModal(true);
  };

  const handleCloseInviteModal = () => {
    setOpenInviteModal(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  const getAllRooms = () => {
    axios
      .get('/room')
      .then((response) => {
        setRoomList(response.data);
      })
      .catch((err) => console.error(err));
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const createRoom = (roomName: string, isPrivate: boolean) => {
    axios
      .post('/room', { name: roomName, isPrivate: isPrivate }, config)
      .then(() => {
        getAllRooms();
        setOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const inviteUser = (userId: string, roomId: string) => {
    console.log(userId, roomId);
  };

  useEffect(() => getAllRooms(), []);

  console.log(state.user.token);

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
      <RoomList title='Rooms' rooms={roomList} />
      <Divider />
      <RoomList title='Private Rooms' rooms={[]} />
      <Button
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        disableElevation
        variant='contained'
      >
        Create room
      </Button>
      <Button
        style={{ marginTop: '16px' }}
        onClick={handleOpenInviteModal}
        startIcon={<AddIcon />}
        disableElevation
        variant='contained'
        color='primary'
      >
        Invite user
      </Button>
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
      <InviteUserModal
        inviteUser={inviteUser}
        handleClose={handleCloseInviteModal}
        open={openInviteModal}
        users={[]}
        rooms={[]}
      />
      <CreateRoomModal
        open={open}
        handleClose={handleClose}
        createRoom={createRoom}
      />
    </Grid>
  );
};

export default SidebarChat;
