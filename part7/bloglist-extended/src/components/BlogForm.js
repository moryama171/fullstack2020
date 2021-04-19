import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../redux/hooks';
import { Button, Form, Header } from 'semantic-ui-react';


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
      <Header>Add a new blog</Header>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Field required>
            <label>title:</label>
            <input
              id='blog-title-input'
              name='Title'
              {...title}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field required>
            <label>author:</label>
            <input
              id='blog-author-input'
              name='Author'
              {...author}
            />
          </Form.Field>
          <Form.Field required>
            <label>url:</label>
            <input
              id='blog-url-input'
              name='Url'
              {...url}
            />
          </Form.Field>
        </Form.Group>
        <Button
          color='pink'
          id='add-blog-button'
          type='submit'
        >
          add blog
          </Button>
      </Form>
    </div>
  );
};

BlogForm.propTypes = {
  handleBlogForm: PropTypes.func.isRequired
};

export default BlogForm;