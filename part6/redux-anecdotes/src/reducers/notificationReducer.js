const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.message;
    case 'HIDE':
      return null;
    default:
      return state;
  }
};

export const showNotification = (message) => {
  return {
    type: 'SHOW',
    message
  };
};

export const hideNotification = () => {
  return {
    type: 'HIDE',
  };
};

export default notificationReducer;