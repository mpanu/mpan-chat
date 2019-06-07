import React from 'react';
import PropTypes from 'prop-types';

function MessageListItem (props) {
  return (
    <li>
      {props.date + " " + props.username}
      <p>{props.message}</p>
    </li>
  );
}

MessageListItem.propTypes = {
  date: PropTypes.string,
  message: PropTypes.string,
  username: PropTypes.string
}

export default MessageListItem;
