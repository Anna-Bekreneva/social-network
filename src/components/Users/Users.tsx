import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/img/user.png';
import {UserType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';

type UsersPropsType = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (page: number) => void
	users: Array<UserType>
	unfollow: (id: number) => void
	follow: (id: number) => void
}

export const Users: React.FC<UsersPropsType> = (props) => {
	const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
	const pages = [];
	for (let i = 1; i < pagesCount; i++) {
		pages.push(i);
	}
	return (
		<div>
			<ul>
				{pages.map((page, index) => {
					return (
						<li key={index}>
							<span className={props.currentPage === page ? styles.selectedPae : ""} onClick={(event) => {props.onPageChanged(page)}}>{page}</span>
						</li>
					)
				})}
			</ul>
			{props.users.map(user => {
				return (
					<div key={user.id}>
						<div>
							<NavLink to={'/profile/' + user.id}>
								<img className={styles.userPhoto} src={user.photos.small ? user.photos.small : userPhoto} alt="#"/>
								{user.followed
									? <button type={'button'} onClick={() => {props.unfollow(user.id);}}>Unfollow</button>
									: <button type={'button'} onClick={() => {props.follow(user.id);}}>Follow</button>
								}
							</NavLink>
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
	)
}