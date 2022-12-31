import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/img/user.png';
import {UsersPropsType} from './UsersContainer';
import axios from 'axios';

class Users extends React.Component<UsersPropsType> {

	constructor (props: UsersPropsType) {
		super(props);
		axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
			this.props.usersPage.users.length === 0 && this.props.setUsers(response.data.items);
			console.log(response.data.items)
		})
	}

	render () {
		return (
			<div>
				{this.props.usersPage.users.map(user => {
					return (
						<div key={user.id}>
						<div>
							<img className={styles.userPhoto} src={user.photos.small ? user.photos.small : userPhoto} alt="#"/>
							{user.followed
								? <button type={'button'} onClick={() => {this.props.unfollow(user.id);}}>Unfollow</button>
								: <button type={'button'} onClick={() => {this.props.follow(user.id);}}>Follow</button>
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
}

export default Users;