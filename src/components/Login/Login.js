import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { 
    performLogin,
    selectHasError,
    selectErrorMessage,
    selectAuthenticated } from '../../slices/Auth/authSlice';

import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';

import './Login.css';

const Login = () => {

    // Local state for the form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // history alias for redirects once logged in
    const navigate = useNavigate();

    // setup the dispatcher
    const dispatch = useDispatch();

    // gather data from the auth store
    const hasError = useSelector(selectHasError);
    const errorMessage = useSelector(selectErrorMessage);
    const authenticated = useSelector(selectAuthenticated);

    useEffect(() => {
        if(authenticated){
            return navigate('/');
        }
    }, [authenticated, navigate, dispatch]);

    // deals with changes in the username field
    const handleUsernameChange = (e) => {
        //Prevent the default action
        e.preventDefault();
        // Record any changes in local state
        setUsername(e.target.value);
    };

    // deals with changes in the password field
    const handlePasswordChange = (e) => {
        //Prevent the default action
        e.preventDefault();
        // Record any changes in local state
        setPassword(e.target.value);
    };

    // Handles clicking the login button
    const handleClick = (e) => {

        // Stop the default action of the form
        e.preventDefault();

        // Create the payload to send to the API
        const payload = {
            email: username,
            password: password
        }

        // dispatch the action
        dispatch(performLogin(payload));

    };

    return (

        <div className="loginForm-wrapper" role="presentation">
            
            <form name="loginForm" method="POST" className="loginForm-container">
                
                <div className="login-image">
                    <img src="login-screen.jpg" alt="bee with head in honeycomb" />
                </div>

                <div className="login-title">
                    <h2>Login</h2>
                </div>

                <div className="login-group">
                    <label htmlFor="Username">Username</label>
                    <input 
                    type="text" 
                    id="Username" 
                    name="Username" 
                    placeholder="Username" 
                    onChange={handleUsernameChange}
                    value={username}
                    required />

                    <label htmlFor="Password">Password</label>
                    <input 
                    type="password" 
                    id="Password" 
                    name="Password" 
                    placeholder="Password" 
                    onChange={handlePasswordChange} 
                    value={password}
                    required />

                    <div className="login-button-group">
                        <button 
                        name="Login"
                        onClick={handleClick}>
                            Login
                        </button>
                        <a href="/register" className="button-link">
                            Register
                        </a>
                    </div>

                    <GoogleSignIn />

                </div>
                { hasError ? <div className="login-error">{errorMessage}</div>: null}
            </form>

            

        </div>

    );

};

export default Login;