import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  styled,
} from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';
import { globalColors } from '../../../shared/styles/Auth.styles';

type Props = {
  title: string;
  rooms: any[];
};

const CustomListItem = styled(ListItem)({
  borderRadius: '10px',
  '&:hover': {
    background: globalColors.main,
  },
});

const RoomList: React.FC<Props> = ({ title, rooms }) => {
  const [open, setOpen] = useState(true);
  console.log(rooms);

  const handleOpen = () => setOpen(!open);
  return (
    <List>
      <CustomListItem button onClick={handleOpen}>
        <ListItemText>{title}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </CustomListItem>
      <Collapse in={open}>
        <List component='div' disablePadding>
          {rooms &&
            rooms.map((room) => (
              <CustomListItem button>
                <ListItemIcon>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText style={{ textTransform: 'capitalize' }}>
                  {room.name}
                </ListItemText>
              </CustomListItem>
            ))}
        </List>
      </Collapse>
    </List>
  );
};

export default RoomList;
