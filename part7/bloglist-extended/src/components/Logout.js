import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../redux/reducers/userReducer';


const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    history.push('/')
  };

  return (
    <div>
      <p>
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );
};


export default Logout;