import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {

  const notification = useSelector(({ notification }) => { return notification; });

  const notificationStyle = {
    marginBottom: 25,
    maxWidth: '50%',
    background: notification.error ? '#FF8383' : '#AEE0A1',
    border: notification.error ? 'solid #FFAFAF' : 'solid #D1EEC9',
    borderRadius: 5,
    borderWidth: 2,
    paddingLeft: '0.5em',
    fontSize: 17
  };

  if (!notification.message) {
    return null;
  }
  return (
    <div className="notification" style={notificationStyle}>
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
