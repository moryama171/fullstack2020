import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../redux/hooks';


const BlogForm = ({ handleBlogForm }) => {
  const { reset: resetTitle, ...title } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetUrl, ...url } = useField('text');

  const addBlog = (event) => {
    event.preventDefault();
    handleBlogForm({
      title: title.value,
      author: author.value,
      url: url.value
    });
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <p>
            title:
            <input
              id='blog-title-input'
              name='Title'
              {...title}
            />
          </p>
        </div>
        <div>
          <p>
            author:
            <input
              id='blog-author-input'
              name='Author'
              {...author}
            />
          </p>
        </div>
        <div>
          <p>
            url:
            <input
              id='blog-url-input'
              name='Url'
              {...url}
            />
          </p>
        </div>
        <button id='add-blog-button' type='submit'>add blog</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleBlogForm: PropTypes.func.isRequired
};

export default BlogForm;