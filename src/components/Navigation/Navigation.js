import React from 'react';
import { useSelector } from 'react-redux';

import { getAuth } from '../../utils/auth';
import { selectCartCount } from '../../slices/Cart/cartSlice';

import './Navigation.css';

const Navigation = (props) => {

    // extract the props
    const { auth, token, user } = getAuth();
    const { handleLogout } = props;

    // Get the number of items in the cart if needed
    const numCartItems = useSelector(selectCartCount);

    return (

    <div className="navmenu">
        {!auth ? <a href="/login" className="navitem">Login</a> : <a href="/profile" className="navitem">Profile</a> }
        {!auth ?  <a href="/register" className="navitem">Register</a> : <a href="/cart" className="navitem">Cart {numCartItems ? numCartItems : null}</a> }
        {!auth ?  '' : <a href="/login" className="navitem" onClick={handleLogout}>Logout</a> } 
    </div>

    );
};

export default Navigation;