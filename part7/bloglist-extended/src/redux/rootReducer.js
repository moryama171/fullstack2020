import { combineReducers } from 'redux';
import notification from './reducers/notificationReducer';
import blogs from './reducers/blogReducer';
import user from './reducers/userReducer';


const rootReducer = combineReducers({
  notification,
  blogs,
  user,
});

export default rootReducer;
