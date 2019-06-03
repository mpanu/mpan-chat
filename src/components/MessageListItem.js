import React from 'react';

function MessageListItem (props) {
  return (
    <li>
      {props.date + " " + props.username}
      <p>{props.message}</p>
    </li>
  );
}
export default MessageListItem;
