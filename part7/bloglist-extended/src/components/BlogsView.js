import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNotification } from '../redux/hooks';
import { createBlog } from '../redux/reducers/blogReducer';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import { List } from 'semantic-ui-react';


const BlogsView = () => {
  const blogs = useSelector(({ blogs }) => { return blogs; });

  const dispatch = useDispatch();
  const notificationHook = useNotification();

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(blogObject));
      notificationHook.show('Successfully added new blog');
    } catch (exception) {
      notificationHook.show('Could not add new blog, sorry', true);
    }
  };

  const blogFormRef = useRef();

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <Togglable buttonLabel='add blog' ref={blogFormRef}>
          <BlogForm handleBlogForm={addBlog} />
        </Togglable>
      </div>
      <List>
        <ul>
          {blogs.map(blog =>
            <List.Item key={blog.id}>
                <List.Icon name='blogger'/>
              <Link
                to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </List.Item >
          )}
        </ul>
      </List>
    </div>
  );
};

export default BlogsView;