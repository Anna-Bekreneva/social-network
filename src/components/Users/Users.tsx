import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/img/user.png';
import {UserType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

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
				console.log(user.id)
				return (
					<div key={user.id}>
						<div>
							<NavLink to={'/profile/' + user.id}>
								<img className={styles.userPhoto} src={user.photos.small ? user.photos.small : userPhoto} alt="#"/>
							</NavLink>
							{user.followed
								? <button type={'button'} onClick={() => {
									axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
										withCredentials: true,
										headers: {
											"API-kEY" : "249ba22a-40e2-4469-a783-dd0a8a09df63"
										}
									})
									.then(response => {
										if (response.data.resultCode === 0) {
											props.unfollow(user.id)
										}
									})
								}}>Unfollow</button>

								: <button type={'button'} onClick={() => {
									axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
										withCredentials: true
									})
									.then(response => {
										if (response.data.resultCode === 0) {
											props.follow(user.id)
										}
									})
								}}>Follow</button>
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
	)
}