import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, error }) => {
  const notificationStyle = {
    marginBottom: 25,
    maxWidth: '50%',
    background: error ? '#FF8383' : '#AEE0A1',
    border: error ? 'solid #FFAFAF' : 'solid #D1EEC9',
    borderRadius: 5,
    borderWidth: 2,
    paddingLeft: '0.5em',
    fontSize: 17
  };

  if (message === null) {
    return null;
  }
  return (
    <div className="notification" style={notificationStyle}>
      <p>{message}</p>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.bool.isRequired
};

export default Notification;