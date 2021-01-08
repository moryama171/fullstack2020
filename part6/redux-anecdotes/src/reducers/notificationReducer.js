const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data.message
    case 'HIDE':
      return initialState
    default:
      return state
  }
};

export const setNotification = (message) => {
  return {
    type: 'SHOW',
    data: {
      message
    }
  };
};

export const removeNotification = () => {
 return {
      type: 'HIDE',
      data: {
        message: ''
      }
    }
}

export default notificationReducer;