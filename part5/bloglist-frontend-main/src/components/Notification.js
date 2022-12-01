import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  if (message.text === null) {
    return null;
  }

  let notificationStyle = {};

  if (message.style === 'error') {
    notificationStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    };
  } else if (message.style === 'success') {
    notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    };
  }

  return <div style={notificationStyle}>{message.text}</div>;
};

Notification.propTypes = {
  message: PropTypes.object.isRequired
};

export default Notification;
