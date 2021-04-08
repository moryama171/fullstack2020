import React from 'react';
import { Link } from "react-router-dom";
import Logout from './Logout';


const Menu = () => {
  const MenuLinkStyle = {
    paddingRight: '1em',
    backgroundColor: 'pink'
  };

  return (
    <div>
      <Link to='/' style={MenuLinkStyle}>blogs</Link>
      <Link to='/users' style={MenuLinkStyle}>users</Link>
      <span><Logout /></span>
    </div>
  );
};


export default Menu;
