import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../redux/reducers/userReducer';
import { Button } from 'semantic-ui-react';


const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <div>
      <p>
        <Button
          color='blue'
          size='mini'
          onClick={handleLogout}
        >
          logout
          </Button>
      </p>
    </div>
  );
};


export default Logout;