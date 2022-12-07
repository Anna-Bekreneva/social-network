import React from 'react';
import './Profile.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {PropsType} from '../../App';

const Profile: React.FC<PropsType> = (props) => {

    return (
        <>
            <ProfileInfo></ProfileInfo>
            <MyPostsContainer/>
        </>
    )
}

export default Profile;