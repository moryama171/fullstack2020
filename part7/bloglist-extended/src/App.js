import React, { useEffect } from 'react';
import BlogsView from './components/BlogsView';
import UsersView from './components/UsersView';
import User from './components/User';
import Blog from './components/Blog';
import LoginForm from './components/Login';
import Menu from './components/Menu';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './redux/reducers/blogReducer';
import { loadUser } from './redux/reducers/userReducer';
import { Switch, Route, useRouteMatch } from 'react-router-dom';


const App = () => {
  const notification = useSelector(({ notification }) => { return notification; });
  const user = useSelector(({ user }) => { return user; });
  const blogs = useSelector(({ blogs }) => { return blogs; });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(loadUser());
  }, []);

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  return (
    <div>
      {
        user
          ? <Menu />
          : null
      }
      <Notification message={notification.message} error={notification.error} />
      <h1>BlogList</h1>
      {
        user
          ? <Switch>
            <Route path='/blogs/:id'>
              <Blog blog={blog}/>
            </Route>
            <Route path='/users/:id'>
              <User />
            </Route>
          <Route path='/users'>
              <UsersView />
            </Route>
            <Route path='/'>
              <BlogsView />
            </Route>
          </Switch>
          : <LoginForm />
      }
    </div>
  );
};

export default App;