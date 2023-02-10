import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/img/user.png';
import {UsersPropsType} from './UsersContainer';
import axios from 'axios';

class Users extends React.Component<UsersPropsType> {

	componentDidMount () {
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
			this.props.setUsers(response.data.items);
			this.props.setTotalUsersCount(response.data.totalCount);
		})
	}

	onPageChanged = (page: number) => {
		this.props.setCurrentPage(page)
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
		.then(response => {
			this.props.setUsers(response.data.items);
		})
	}

	render () {
		const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
		const pages = [];
		for (let i = 1; i < pagesCount; i++) {
			pages.push(i);
		}

		return (
			<div>
				<ul>
					{pages.map(page => {
						return (
							<li>
								<span className={this.props.currentPage === page ? styles.selectedPae : ""} onClick={(event) => {this.onPageChanged(page)}}>{page}</span>
							</li>
						)
					})}
				</ul>
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