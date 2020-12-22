import React, { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
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
          {blog.user ? blog.user.username : 'anon'}
        </div>
      </div>
    </div>
  );
};

export default Blog;
