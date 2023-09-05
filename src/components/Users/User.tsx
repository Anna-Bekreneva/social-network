import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/img/user.png';
import {UserType} from 'redux/users-reducer';
import {NavLink} from 'react-router-dom';

type UserPropsType = {
    user: UserType
    unfollow: (id: number) => void
    follow: (id: number) => void
    followingInProgress: Array<number>
}

export const User: React.FC<UserPropsType> = ({user, unfollow, follow, followingInProgress}) => {
    return (
        <div>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img className={styles.userPhoto} src={user.photos.small ? user.photos.small : userPhoto} alt="#"/>
                </NavLink>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {unfollow(user.id)}}
                              type={'button'}>Unfollow</button>

                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {follow(user.id)}}
                              type={'button'}>Follow</button>
                }
            </div>
            <div>
                <div>
                    <span>{user.name}</span>
                    <span>{user.status}</span>
                </div>
                <div>
                    <span>{"user.location.country"}</span>
                    <span>{"user.location.city"}</span>
                </div>
            </div>
        </div>
    )
}