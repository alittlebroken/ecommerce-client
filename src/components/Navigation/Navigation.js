import React from 'react';
import { useSelector } from 'react-redux';

import './Navigation.css';

import { selectAuthenticated } from '../../slices/Auth/authSlice';

const Navigation = (props) => {

    // extract the props
    const { authenticated, handleLogout } = props;

    return (

    <div className="navmenu">
        {!authenticated ? <a href="/login" className="navitem">Login</a> : <a href="/profile" className="navitem">Profile</a> }
        {!authenticated ?  <a href="/register" className="navitem">Register</a> : <a href="/cart" className="navitem">Cart</a> }
        {!authenticated ?  '' : <a href="/login" className="navitem" onClick={handleLogout}>Logout</a> } 
    </div>

    );
};

export default Navigation;