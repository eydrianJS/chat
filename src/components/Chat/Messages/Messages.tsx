import React from 'react';
import { IMessageResponse } from '../../../shared/interfaces/IMessageResponse';
import SingleMessage from './SingleMessage/SingleMessage';

type Props = {
  messages: IMessageResponse[];
};

const Messages: React.FC<Props> = ({ messages }) => {
  return (
    <>
      {messages.map((msg: IMessageResponse) => (
        <SingleMessage message={msg} />
      ))}
    </>
  );
};

export default Messages;
