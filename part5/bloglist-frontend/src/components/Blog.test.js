import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';


describe('<Blog />', () => {
  let component;
  let mockUpdateHandler;

  beforeEach(() => {
    const blog = {
      author: 'author',
      title: 'title',
      url: 'url',
      user: '5fe304a6993d6082ed28006d',
      likes: 'likes'
    };

    mockUpdateHandler = jest.fn();

    component = render(
      <Blog
        blog={blog}
        removeBlog={() => { }}
        updateBlog={mockUpdateHandler}
        isUser={false}
      />
    );
  });

  test('by default renders blog title and author, but not url or number if likes', () => {
    const titleAndAuthor = component.container.querySelector('#blogHeadline');
    const urlAndLikes = component.container.querySelector('.blog-details');

    expect(titleAndAuthor).toBeVisible();
    expect(urlAndLikes).not.toBeVisible();
  });

  test('after clicking the button once, blog url and likes are shown', () => {
    const button = component.container.querySelector('.show-button');
    fireEvent.click(button);

    const urlAndLikes = component.container.querySelector('.blog-details');
    expect(urlAndLikes).toBeVisible();
  });

  test('when "like" button is clicked twice, its event handler is called twice', () => {

    const like-button = component.container.querySelector('.like-button');
    fireEvent.click(like-button);
    fireEvent.click(like-button);

    expect(mockUpdateHandler.mock.calls).toHaveLength(2);
  });
});

