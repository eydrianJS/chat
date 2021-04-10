import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

type Props = {
  open: boolean;
  handleClose: (callback: () => void) => void;
  createRoom: (roomName: string, isPrivate: boolean) => void;
};

const CreateRoomModal: React.FC<Props> = ({
  open,
  handleClose,
  createRoom,
}) => {
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    console.log('mount');
    return () => console.log('unmount');
  }, []);

  const clearFields = () => {
    setName('');
    setIsPrivate(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose(clearFields)}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title' style={{ paddingBottom: '0' }}>
          Create room
        </DialogTitle>
        <DialogContent style={{ width: '250px' }}>
          <TextField
            value={name}
            autoFocus
            margin='dense'
            id='roomName'
            label='Room name'
            fullWidth
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isPrivate}
                onChange={(
                  event: ChangeEvent<HTMLInputElement>,
                  checked: boolean
                ) => setIsPrivate(checked)}
                name='checkedB'
                color='primary'
              />
            }
            label='Private room'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(clearFields)} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => createRoom(name, isPrivate)}
            color='primary'
            disabled={!(name.length > 2)}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateRoomModal;
