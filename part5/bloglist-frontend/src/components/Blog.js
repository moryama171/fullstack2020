import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  // Styles
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <div>
        <p>
          {blog.title} by {blog.author}
          <button onClick={toggleVisibility}>view</button>
          <div style={showWhenVisible}>
            <p>{blog.url}</p>
            <p>likes {blog.likes}</p>
            {blog.user ? <p>{blog.user.username}</p> : <p>anon</p>}
          </div>
        </p>
      </div>
    </div>
  );
};

export default Blog;
