import React from 'react';
import './Profile.css';
import MyPosts from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {StoreType} from '../../redux/state';


const Profile: React.FC<StoreType> = (props) => {

    return (
        <>
            <ProfileInfo></ProfileInfo>
            <MyPosts
                _state={props._state}
                dispatch={props.dispatch}
                _callSubscriber={props._callSubscriber}
                getState={props.getState}
                subscribe={props.subscribe}
            />
        </>
    )
}

export default Profile;