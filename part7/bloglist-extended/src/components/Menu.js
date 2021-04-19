import React from 'react';
import { Link } from "react-router-dom";
import Logout from './Logout';
import { Menu as SuiMenu } from 'semantic-ui-react';


const Menu = () => {

    return (
        <SuiMenu>
            <SuiMenu.Item as={Link} to='/'>
                blogs
            </SuiMenu.Item>
            <SuiMenu.Item as={Link} to='/users'>
                users
            </SuiMenu.Item>
            <SuiMenu.Item><Logout /></SuiMenu.Item>
        </SuiMenu>
    );
};


export default Menu;
