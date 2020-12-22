import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, removeBlog, updateBlog }) => {

  const [visible, setVisible] = useState(false);
  const user = JSON.parse(window.localStorage.getItem('loggedUser'));
  const isUser= user.username === blog.user.username;

  // Styles
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const showWhenIsUser = { display: isUser ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = () => {
    updateBlog(
      blog.id,
      {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        user: blog.user.id,
        likes: blog.likes + 1
      }
    );
  };

  const remove = () => {
    removeBlog(blog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>view</button>
        <div style={showWhenVisible}>
          <p>{blog.url}</p>
          <p>
              likes {blog.likes}
            <button onClick={addLike}>like</button>
          </p>
          <p>user: {blog.user.username}</p>
          <button style={showWhenIsUser} onClick={remove}>remove</button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired
};

export default Blog;
