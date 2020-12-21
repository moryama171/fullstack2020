import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      );
      setUser(user);
    } catch (exception) {
      console.log('Login failed, sorry');
    }
    setUsername('');
    setPassword('');
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => (
    <div>
      <h3>Please log in</h3>
      <form onSubmit={handleLogin}>
        <div>
          username
        <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
        <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogsForm = () => (
    <div>
      <h3>blogs</h3>
      <div>
        <p>
          Welcome back {user.username}!
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );


  return (
    <div>
      <h1>BlogList</h1>
      {user === null
        ? loginForm()
        : blogsForm()
      }
    </div>
  );
};

export default App;