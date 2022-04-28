import React, { useEffect } from 'react';
import { performGoogleLogin } from '../../slices/Auth/authSlice';
import { useDispatch } from 'react-redux';


const GoogleSignIn = () => {

    /**
     * Alias the dispatch hook
     */
    const dispatch = useDispatch();

    /**
     * Assign the client ID we need from the environment
     */
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    
    /**
     * Callback for handling google singin
     */
    const handleGoogleSignIn = (response) => {

        /**
         * Generate a payload to send to the API
         */
        const payload = {
            token: response.credential
        }

        /**
         * Pass the credentials to our backend
         */
        dispatch(performGoogleLogin(payload));

    };

    /**
     * Register the callback in the window
     */
    window.handleGoogleSignIn = handleGoogleSignIn;

    /**
     * Initialise the google identity services API
     */
    const initGSI = () =>{
        /**
         * Check if we have google in the window object
         */
        if(window.google){
            /**
             * Set the credentails
             */
            window.google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: handleGoogleSignIn
            });
        }
        
    }

    useEffect(() => {
        initGSI();
    }, []);

    return (
        <div id="googleLoginContainer" role="presentation">

            <div 
            id="g_id_onload" 
            data-client_id={CLIENT_ID}
            data-callback="handleGoogleSignIn"
            ></div>

            <div className="g_id_signin"
            data-type="standard"
            data-size="large"
            data-theme="outline"
            data-text="sign_in_with"
            data-shape="rectangular"
            data-logo_alignment="left">
            </div>


        </div>
    )

};

export default GoogleSignIn;