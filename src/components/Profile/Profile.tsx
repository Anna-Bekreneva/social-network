import React from 'react';
import './Profile.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType} from '../../redux/profile-reducer';

const Profile = (props: ProfileType) => {

    return (
        <>
            <ProfileInfo photos={props.photos} contacts={props.contacts} fullName={props.fullName} lookingForAJob={props.lookingForAJob} lookingForAJobDescription={props.lookingForAJobDescription} userId={props.userId}/>
            <MyPostsContainer/>
        </>
    )
}

export default Profile;