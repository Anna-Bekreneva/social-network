import React from 'react';
import styles from './users.module.css';
import {UsersPropsType} from './UsersContainer';

export const Users: React.FC<UsersPropsType> = (props) => {

	props.usersPage.users.length === 0 && props.setUsers([
		{id: 1, photoUrl: 'https://i.pinimg.com/736x/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg', followed: false, fullName: 'Dmitry', status: "I'm a boss", location: {city: 'Minsk', country: 'Belarus'}},
		{id: 2, photoUrl: 'https://i.pinimg.com/736x/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg', followed: true, fullName: 'Sasha', status: "I'm a boss too", location: {city: 'Moscow', country: 'Russia'}},
		{id: 3, photoUrl: 'https://i.pinimg.com/736x/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg', followed: false, fullName: 'Andrew', status: "I'm a boss too", location: {city: 'Kiev', country: 'Ukraine'}},
	])

	return (
		<div>
			{props.usersPage.users.map(user => {
				return (
					<div key={user.id}>
						<div>
							<img className={styles.userPhoto} src={user.photoUrl} alt="#"/>
							{ user.followed
								? <button type={'button'} onClick={() => {props.follow(user.id)}}>Unfollow</button>
								: <button type={'button'} onClick={() => {props.unfollow(user.id)}}>Follow</button>
							}

						</div>
						<div>
							<div>
								<span>{user.fullName}</span>
								<span>{user.status}</span>
							</div>
							<div>
								<span>{user.location.country}</span>
								<span>{user.location.city}</span>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};