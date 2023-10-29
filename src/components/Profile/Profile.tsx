import React, {ChangeEvent} from 'react';
import './Profile.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfilePagePropsType} from "./ProfileContainer";

const Profile = (props: ProfilePagePropsType) => {

    const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            props.savePhoto(event.target.files[0])
        }
    }

    return (
        <>
            <ProfileInfo savePhoto={props.savePhoto} isOwner={props.isOwner} photos={props.photos} contacts={props.contacts} fullName={props.fullName} lookingForAJob={props.lookingForAJob} lookingForAJobDescription={props.lookingForAJobDescription} userId={props.userId} aboutMe={props.aboutMe} status={props.status} getStatus={props.getStatus} getUserProfile={props.getUserProfile} updateStatus={props.updateStatus} isAuth={props.isAuth}/>
            {props.isOwner && <input onChange={onMainPhotoSelected} type={"file"}/> }
            <MyPostsContainer/>
        </>
    )
}

export default Profile;