import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { updateUser } from '../../api/auth/auth';
import './ProfileAccount.css';

const ProfileAccount = (props) => {

    /**
     * Alias the dispatch hook
     */
    const dispatch = useDispatch();

    /**
     * Extract the data from the props
     */
    const {
        user_id,
        email,
        forename,
        surname,
        contact_number
    } = props.profileData;

    /**
     * Keep track of the components form inputs
     */
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    /**
     * Keep track of messages
     */
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('OK');
    const [messageCode, setMessageCode] = useState(200);
    const [messageStyle, setMessageStyle] = useState('');

    /**
     * Handle change of passed in prop data
     */
    useEffect(() => {
        setFirstName(forename);
        setLastName(surname);
        setContactNumber(contact_number);
    },[forename, surname, email, contact_number, dispatch]);

    /**
     * Callback for updating a users details
     */
    const updateProfileAccount = useCallback(async (payload) => {

        const response = await updateUser({ id: payload.id, updates: payload.updates, token: payload.token});
        
        /**
         * Log any messages
         */
        setMessageCode(response?.data?.status);

        /**
         * Display the appropriate message depending on the status code
         */
        if(messageCode < 300){
            /**
             * We have a successful message
             */
            setMessage('Update successful.');
            setMessageType('SUCCESS');
            setMessageStyle('message-ok');
        } else if(messageCode > 300) {
            /**
             *We have an error
             */
            setMessage('Unable to update your account details. Please try again later');
            setMessageType('ERROR');
            setMessageStyle('message-error');
        }

    }, [messageCode]);

    /**
     * Handlers for the various updates to the form and submitting the form as well;
     */
    const handleSubmitForm = async (e) => {
        /**
         * Prevent the from from just being submitted
         */
        e.preventDefault();

        /**
         * Create the payload to be sent
         */
        const payload = {
            id: user_id,
            token: props.token,
            updates: {
                "table_key_col": "user_id",
                data: [
                    { "column": "forename", "value": firstName },
                    { "column": "surname", "value": lastName },
                    { "column": "contact_number", "value": contactNumber },
                ] 
            }
        }

        /**
         * Send the update to the API
         */
         updateProfileAccount(payload);

    };

    const handleChangeFirstName = async (e) => {
        setFirstName(e.target.value);
    };

    const handleChangeLastName = async (e) => {
        setLastName(e.target.value);
    };

    const handleChangeContactNumber = async (e) => {
        setContactNumber(e.target.value);
    }

    return(
        <div role="presentation" className="profileaccount-container">

            <h3 className="profileaccount-title">Account Details:</h3>
            
            <form 
            className="profileaccount-form" 
            name="profileaccount-form" 
            method="POST" 
            onSubmit={handleSubmitForm}>

                <label 
                className="profileaccount-forename" 
                htmlFor="firstname">
                    Forename:<br />
                    <input 
                    type="text" 
                    name="firstname" 
                    value={firstName} 
                    onChange={handleChangeFirstName} 
                    required />
                </label>

                <label
                className="profileaccount-surname"
                htmlFor="lastname">
                    Surname:<br />
                    <input 
                    type="text" 
                    name="lastname" 
                    value={lastName} 
                    onChange={handleChangeLastName} 
                    required />
                </label>

                <label
                className="profileaccount-contact"
                for="contactNumber">
                    Contact Number:<br />
                    <input 
                    type="text" 
                    name="contactNumber" 
                    value={contactNumber} 
                    onChange={handleChangeContactNumber} />
                </label>

                <button 
                className="profileaccount-save button"
                type="submit">
                    Save
                </button>
            </form>

            <div role="presentation" class={`profileaccount-messages ${messageStyle}`} >
                {message ? message : null}
            </div>

        </div>
    )
};

export default ProfileAccount;