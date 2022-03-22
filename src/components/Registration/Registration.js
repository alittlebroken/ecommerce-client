import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { 
    registerAccount,
    selectHasError,
    selectErrorMessage } from '../../slices/Auth/authSlice';

import './Registration.css';

const Registration = () => {

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
        dispatch(registerAccount(payload));

        if(!hasError){
            navigate('/login');
        }

    };

    // Render the HTML/JSX
    return (
        <div className="registration-wrapper" role="presentation">

            <form name="resgistrationForm" className="registration-container" method="POST">

                <div className="registration-image">
                    <img src="login-screen.jpg" alt="bee with head in honeycomb" />
                </div>

                <div className="registration-title">
                    <h2>Registration</h2>
                </div>

                <div className="registration-group">
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

                    <div className="registration-button-group">
                        <button 
                        name="Register"
                        onClick={handleClick}>
                            Register
                        </button>
                        
                        <a href="/login">
                            Already have an account? Login.
                        </a>
                       
                    </div>
                    
                </div>
                { hasError ? <div className="registration-error">{errorMessage}</div>: null}
            </form>

        </div>
    );

};

export default Registration;