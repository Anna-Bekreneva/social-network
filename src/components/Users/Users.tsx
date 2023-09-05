import React from 'react';
import {UserType} from 'redux/users-reducer';
import {Paginator} from "components/common/Paginator/Paginator";
import {User} from "components/Users/User";

type UsersPropsType = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (page: number) => void
	users: Array<UserType>
	unfollow: (id: number) => void
	follow: (id: number) => void
	followingInProgress: Array<number>
	toggleIsFollowingProgress: (followingInProgress: boolean, id: number) => void
}

export const Users: React.FC<UsersPropsType> = (props) => {
	const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
	const pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}
	return (
		<div>
			<Paginator
				currentPage={props.currentPage}
				onPageChanged={props.onPageChanged}
				pageSize={props.pageSize}
				totalUsersCount={props.totalUsersCount}></Paginator>

			{props.users.map(user =>
				<User user={user}
					  follow={props.follow}
					  followingInProgress={props.followingInProgress}
					  unfollow={props.unfollow} key={user.id}></User>)}
		</div>
	)
}
