import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
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

  const blogsSortedBylikes = [...blogs].sort((a, b) => {
    return a.likes - b.likes;
  }).reverse();

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
      blogFormRef.current.toggleVisibility();
      showNotification('Successfully added new blog');
      blogService.setToken(user.token);
      setBlogs(blogs.concat(savedBlog));
    } catch (exception) {
      setError(true);
      showNotification('Could not add new blog');
    }
  };

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject);
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog));
      showNotification('Awesome');
    } catch (exception) {
      setError(true);
      showNotification('Could not update blog');
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

  const blogFormRef = useRef();
  const blogsView = () => (
    <div>
      <div>
        <p>
          Welcome back {user.username}!
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      <div>
        <Togglable buttonLabel='add blog' ref={blogFormRef}>
          <BlogForm handleBlogForm={handleBlogForm}/>
        </Togglable>
      </div>
      <h2>Blogs</h2>
      <div>
        {blogsSortedBylikes.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
        )}
      </div>
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