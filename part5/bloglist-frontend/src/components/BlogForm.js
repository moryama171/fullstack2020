import React, { useState } from 'react';

const BlogForm = ({ handleBlogForm }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  
  const addBlog = (event) => {
    event.preventDefault();
    handleBlogForm({
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <p>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </p>
        </div>
        <div>
          <p>
        author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </p>
        </div>
        <div>
          <p>
        url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </p>
        </div>
        <button type="submit">add blog</button>
      </form>
    </div>
  );
};

export default BlogForm;