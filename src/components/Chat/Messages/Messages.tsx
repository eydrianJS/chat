import React from 'react';
import SingleMessage from './SingleMessage/SingleMessage';

type Props = {
  messages: string[];
};

const Messages: React.FC<Props> = ({ messages }) => {
  return (
    <>
      {messages.map((msg) => (
        <SingleMessage text={msg} />
      ))}
    </>
  );
};

export default Messages;
