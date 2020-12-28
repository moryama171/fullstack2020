import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';
import { mockComponent } from 'react-dom/test-utils';


describe('<BlogForm />', () => {
  test('when clicking submit the form calls a function to create a new blog with the expected details', () => {
    const mockCreateBlog = jest.fn();

    const component = render(
      <BlogForm handleBlogForm={mockCreateBlog} />
    );
    
    const title = component.container.querySelector('#title');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('form');

    fireEvent.change(title, {
      target: { value: 'blog title' }
    });
    fireEvent.change(url, {
      target: { value: 'blog url' }
    });
    fireEvent.submit(form);

    expect(mockCreateBlog.mock.calls).toHaveLength(1);
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('blog title')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('blog url')
  });
});