import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNotification } from '../redux/hooks';
import { loginUser } from '../redux/reducers/userReducer';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const notificationHook = useNotification();

  const dispatch = useDispatch();

  const logUserIn = (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }))
      .then(() => {
        notificationHook.show('Successfully logged in');
      })
      .catch(() => notificationHook.show('Invalid username or password', true));
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={logUserIn}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  );
};


export default LoginForm;