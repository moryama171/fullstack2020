import React, { useState } from 'react';

const Blog = ({ blog, removeBlog, updateBlog }) => {

  const [visible, setVisible] = useState(false);
  const userJSON = window.localStorage.getItem('loggedUser');
  const user = JSON.parse(userJSON);
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
          <p>{blog.user.username}</p>
          <button style={showWhenIsUser} onClick={remove}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
