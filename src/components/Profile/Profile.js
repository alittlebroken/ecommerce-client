import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelect } from 'react-redux';
import { getAuth } from '../../utils/auth';
import { getUser } from '../../api/auth/auth';

import ProfileOrders from  '../ProfileOrders/ProfileOrders';
import ProfileAccount from '../ProfileAccount/ProfileAccount';
import './Profile.css';

const Profile = () => {

    /**
     * Set the state for this componment
     */
    const [profileData, setProfileData] = useState({});

    // Get the authentication information
    const { auth, user, token } = getAuth();

    // Alias the dispatch function
    const dispatch = useDispatch();

    /**
     * function to load a users data
     */
    const getProfile = useCallback(async (payload) => {

        const response = await getUser({ user_id: payload.id, token: payload.token });
        setProfileData(response.data[0]);
        
    }, []);

    /**
     * Load the data
     */
    useEffect(() => {

        const payload = { id: user?._id, token };
        try{
            getProfile(payload)
        }catch(error){
            throw error;
        }

    }, [getProfile, user?._id, token]);

    return (
        <div className="profile-container" role="presentation">

            <div role="presentation" className="profile-image">
                {profileData?.avatar_url ? null : <img className="profile-avatar" src={`/media/images/deafult_profile_avatar.jpg`} alt="User Profile Avatar" />}
            </div>

            <div role="presentation" className="profile-name">
                <span>{`${profileData.forename} ${profileData.surname}`}</span>
            </div>

            <div role="presentation" className="profile-email">
                <span>{profileData.email}</span>
            </div>

            <ProfileOrders />

            <ProfileAccount 
            profileData={profileData}
            token={token} />

        </div>
    )

};

export default Profile;