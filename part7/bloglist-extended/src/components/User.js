import React, { useState, useEffect } from 'react';
import userService from '../services/users';
import { useParams } from 'react-router-dom';


const User = () => {
  const [user, setUser] = useState(null);
  const userId = useParams().id;
  const userHasBlog = user ? user.blogs.length > 0 : false;

  useEffect(() => {
    userService
      .getById(userId)
      .then(fetchedUser => setUser(fetchedUser))
      .catch(() => console.log('Could not find user'));
  }, []);

  if (user) {
    return (
      <div>
        <h2>{user.username}</h2>
        {
          userHasBlog
            ?
            <ul>
              {
                user.blogs.map(blog =>
                  <li key={blog.id}>
                    {blog.title}
                  </li>
                )
              }
            </ul>
            : `${user.username} has no blogs yet`
        }
      </div >
    );
  }

  return null;
};


export default User;
