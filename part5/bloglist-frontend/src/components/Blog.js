import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, removeBlog, updateBlog, isUser }) => {

  const [visible, setVisible] = useState(false);

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
      <div className='blog'>
        <div id="blogHeadline">
          {blog.title} by {blog.author}
        </div>
        <button className="show-button" onClick={toggleVisibility}>view</button>
        <div className="blog-details" style={showWhenVisible}>
          <p>{blog.url}</p>
          <p className='blog-likes'>
              likes {blog.likes}
            <button className="like-button" onClick={addLike}>like</button>
          </p>
          <p>user: {blog.user.username}</p>
          <button className="remove-button" style={showWhenIsUser} onClick={remove}>remove</button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  isUser: PropTypes.bool
};

export default Blog;
