import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/Login';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

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

  const handleBlogForm = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject);
      showNotification('Successfully added new blog');
      blogService.setToken(user.token);
      setBlogs(blogs.concat(savedBlog));
    } catch (exception) {
      setError(true);
      showNotification('Could not add new blog');
    }
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
      <BlogForm handleBlogForm={handleBlogForm}/>
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