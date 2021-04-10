import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useEffect, useState } from 'react';

type Props = {
  users: any[];
  rooms: any[];
  open: boolean;
  handleClose: () => void;
  inviteUser: (userId: string, roomId: string) => void;
};

const InviteUserModal: React.FC<Props> = ({
  users,
  rooms,
  open,
  handleClose,
  inviteUser,
}) => {
  const [name, setName] = useState({
    userId: '',
    roomId: '',
  });

  const handleSelect = (name: 'userId' | 'roomId') => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setName((prevValue) => ({ ...prevValue, [name]: event.target.value }));
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title' style={{ paddingBottom: '0' }}>
          Invite user
        </DialogTitle>
        <DialogContent style={{ width: '250px', height: '50px' }}>
          <FormControl
            style={{ width: 'calc(50% - 16px)', marginRight: '16px' }}
          >
            <InputLabel id='demo-simple-select-label'>Age</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={name.userId}
              onChange={handleSelect('userId')}
            >
              <MenuItem value={10}>Mike</MenuItem>
              <MenuItem value={20}>Jake</MenuItem>
              <MenuItem value={30}>Adrian</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: '50%' }}>
            <InputLabel id='demo-simple-select-label'>Rooms</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={name.roomId}
              onChange={handleSelect('roomId')}
            >
              <MenuItem value={10}>Room 1</MenuItem>
              <MenuItem value={20}>Room 2</MenuItem>
              <MenuItem value={30}>Room 3</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => inviteUser(name.userId, name.roomId)}
            color='primary'
            disabled={!(name.roomId && name.userId)}
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InviteUserModal;
