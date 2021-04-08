import { notificationSet } from '../actions';


const initialState = {};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    default:
      return state;
  }
};

export const setNotification = (message, error) => {
  return async (dispatch) => {
    dispatch(notificationSet(message, error));

    setTimeout(() => {
      dispatch(notificationSet(null));
    }, 2000);
  };
};

export default notificationReducer;
