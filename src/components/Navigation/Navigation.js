import React from 'react';

import './Navigation.css';

const Navigation = (props) => {

    // extract the props
    const { authenticated } = props;

    return (

    <div className="navmenu">
        {!authenticated ? <a href="/login" className="navitem">Login</a> : <a href="/profile" className="navitem">Profile</a> }
        {!authenticated ?  <a href="/register" className="navitem">Register</a> : <a href="/cart" className="navitem">Cart</a> }
        {!authenticated ?  '' : <a href="/logout" className="navitem">Logout</a> } 
    </div>

    );
};

export default Navigation;