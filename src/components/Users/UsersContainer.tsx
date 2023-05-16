import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
	followSuccess,
	getUsers,
	setCurrentPage,
	setTotalUsersCount,
	setUsers,
	toggleIsFetching,
	toggleIsFollowingProgress,
	unfollowSuccess,
	UserType
} from '../../redux/users-reducer';
import React from 'react';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


export type MapStatePropsType = {
	users: Array<UserType>
	pageSize: number
	totalUsersCount: number
	currentPage: number
	isFetching: boolean
	followingInProgress: Array<number>
}

type mapDispatchToPropsType = {
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	setUsers: (users: Array<UserType>) => void
	setCurrentPage: (page: number) => void
	setTotalUsersCount: (usersCount: number) => void
	toggleIsFetching: (isFetching: boolean) => void
	toggleIsFollowingProgress: (isFollowing: boolean, id: number) => void
	getUsers: (currentPage: number, pageSize: number) => void
}

class UsersContainer extends React.Component<UsersPropsType> {

	componentDidMount () {
		this.props.getUsers(this.props.currentPage, this.props.pageSize);
	}

	onPageChanged = (page: number) => {
		this.props.getUsers(page, this.props.pageSize);
	}

	render () {
		return (
			<>
				{this.props.isFetching ? <Preloader/> : null}
				<Users
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					onPageChanged={this.onPageChanged}
					users={this.props.users}
					follow={this.props.follow}
					unfollow={this.props.unfollow}
					toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
					followingInProgress={this.props.followingInProgress}
				/>
			</>
		)
	}
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		users: state.users.users,
		pageSize: state.users.pageSize,
		totalUsersCount: state.users.totalUsersCount,
		currentPage: state.users.currentPage,
		isFetching: state.users.isFetching,
		followingInProgress: state.users.followingInProgress
	}
}

export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType

const withRedirect = withAuthRedirect(UsersContainer)

export default connect(mapStateToProps, {follow: followSuccess, unfollow: unfollowSuccess, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleIsFollowingProgress, getUsers}) (withRedirect);
