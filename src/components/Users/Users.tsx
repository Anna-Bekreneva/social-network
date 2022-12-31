import React from 'react';
import styles from './users.module.css';
import {UsersPropsType} from './UsersContainer';
import axios from 'axios';
import userPhoto from './../../assets/img/user.png'

export const Users: React.FC<UsersPropsType> = (props) => {
	axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
		props.usersPage.users.length === 0 && props.setUsers(response.data.items);
		console.log(response.data.items)
	})

	return (
		<div>
			{props.usersPage.users.map(user => {
				return (
					<div key={user.id}>
						<div>
							<img className={styles.userPhoto} src={user.photos.small ? user.photos.small : userPhoto} alt="#"/>
							{user.followed
								? <button type={'button'} onClick={() => {props.unfollow(user.id);}}>Unfollow</button>
								: <button type={'button'} onClick={() => {props.follow(user.id);}}>Follow</button>
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
				);
			})}
		</div>
	);
};