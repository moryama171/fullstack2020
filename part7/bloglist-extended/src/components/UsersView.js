import React, { useState, useEffect } from 'react';
import userService from '../services/users';
import { Link } from 'react-router-dom';


const UsersView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService
      .getAll()
      .then(fetchedUsers => setUsers(fetchedUsers))
      .catch(() => console.log('Could not fetch users'));
  }, []);


  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th><b>blogs created</b></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default UsersView;
