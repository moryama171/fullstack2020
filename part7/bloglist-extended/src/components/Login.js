import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNotification } from '../redux/hooks';
import { loginUser } from '../redux/reducers/userReducer';
import { Button, Form } from 'semantic-ui-react';


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
      <Form onSubmit={logUserIn}>
        <Form.Field required>
            <label>username:</label>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Field>
        <Form.Field required>
        <label>password:</label>
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Field>
        <Button
          color='brown'
          size='large'
          id="login-button"
          type="submit"
        >
          login
        </Button>
      </Form>
    </div>
  );
};


export default LoginForm;