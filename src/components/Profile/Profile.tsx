import React from 'react';
import './Profile.css';
import MyPosts from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {AppDispatch} from '../../redux/redux-store';
import {ProfilePageType} from '../../redux/store';

type ProfileType = {
    state: ProfilePageType
    dispatch: AppDispatch
}

const Profile: React.FC<ProfileType> = (props: ProfileType) => {

    return (
        <>
            <ProfileInfo></ProfileInfo>
            <MyPosts
                state={props.state}
                dispatch={props.dispatch}
            />
        </>
    )
}

export default Profile;