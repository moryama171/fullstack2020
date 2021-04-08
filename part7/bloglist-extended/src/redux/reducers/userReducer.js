import loginService from '../../services/login';
import blogService from '../../services/blogs';
import { userSet, userCleared } from '../actions';


const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'CLEAR_USER':
      return action.payload;
    default:
      return state;
  }
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);

    // Persist user in session
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    );

    // Allow fetching user's blogs
    blogService.setToken(user.token, user.username);

    dispatch(userSet(user));
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    const loggedUser = JSON.parse(loggedUserJSON);

    if (loggedUser) {
      blogService.setToken(loggedUser.token);
    }

    dispatch(userSet(loggedUser));
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    dispatch(userCleared());
  };
};


export default userReducer;