import React from 'react';
import background from '../../shared/assets/cloud-chat-bg.svg';
import Box from '@material-ui/core/Box/Box';

const Background = () => {
  return (
    <Box
      flex='1'
      className='background'
      style={{ backgroundImage: `url(${background})` }}
    />
  );
};

export default Background;
