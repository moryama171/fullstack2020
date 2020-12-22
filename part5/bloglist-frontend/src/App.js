import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/Login';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [error, setError] = useState(false);

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
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      );
      setUser(user);
      showNotification('Successfully logged in');
    } catch (exception) {
      setError(true);
      showNotification('Invalid username or password');
    }
  };

  const handleBlogForm = async (event) => {
    event.preventDefault();
    try {
      const savedBlog = await blogService.create({
        title,
        author,
        url
      });
      showNotification('Successfully added new blog');
      blogService.setToken(user.token);
      setBlogs(blogs.concat(savedBlog));
    } catch (exception) {
      setError(true);
      showNotification('Could not add new blog');
    }
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
    showNotification('Successfully logged out');
  };

  const loginForm = () => (
    <LoginForm handleLogin={handleLogin}/>
  );

  const blogsView = () => (
    <div>
      <h3>blogs</h3>
      <div>
        <p>
          Welcome back {user.username}!
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      <div>
        <h4>Add a new blog</h4>
        <form onSubmit={handleBlogForm}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">add blog</button>
        </form>



      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );

  const showNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
      setError(false);
    }, 2000);
  };

  return (
    <div>
      <h1>BlogList</h1>
      <Notification message={notificationMessage} error={error} />
      {user === null
        ? loginForm()
        : blogsView()
      }
    </div>
  );
};

export default App;