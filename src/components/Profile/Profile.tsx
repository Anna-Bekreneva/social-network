import React from 'react';
import './Profile.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfilePagePropsType} from "./ProfileContainer";

const Profile = (props: ProfilePagePropsType) => {
    return (
        <>
            <ProfileInfo photos={props.photos} contacts={props.contacts} fullName={props.fullName} lookingForAJob={props.lookingForAJob} lookingForAJobDescription={props.lookingForAJobDescription} userId={props.userId} aboutMe={props.aboutMe} status={props.status} getStatus={props.getStatus} getUserProfile={props.getUserProfile} updateStatus={props.updateStatus} isAuth={props.isAuth}/>
            <MyPostsContainer/>
        </>
    )
}

export default Profile;