import React from 'react';
import MessageListItem from './MessageListItem';

function MessageList(props) {
  const messages = props.messages;
  const listItems = messages.map((item) =>
    <MessageListItem
      key={item.date + item.username}
      date={item.date}
      username={item.username}
      message={item.text} />);
  return (
    <ul>{listItems}</ul>
  );

}
export default MessageList;