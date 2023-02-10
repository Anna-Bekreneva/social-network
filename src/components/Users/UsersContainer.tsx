import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
	followAC,
	setCurrentPageAC,
	setTotalUsersCountAC,
	setUsersAC,
	unfollowAC,
	UsersPageType,
	UserType
} from '../../redux/users-reducer';
import {Dispatch} from 'redux';
import Users from './Users';

type MapStatePropsType = {
	usersPage: UsersPageType
	pageSize: number
	totalUsersCount: number
	currentPage: number
}

type mapDispatchToPropsType = {
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	setUsers: (users: Array<UserType>) => void
	setCurrentPage: (page: number) => void
	setTotalUsersCount: (usersCount: number) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		usersPage: state.users,
		pageSize: state.users.pageSize,
		totalUsersCount: state.users.totalUsersCount,
		currentPage: state.users.currentPage
	}
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
	return {
		follow: (userId: number) => dispatch(followAC(userId)),
		unfollow: (userId: number) => dispatch(unfollowAC(userId)),
		setUsers: (users: Array<UserType>) => dispatch(setUsersAC(users)),
		setCurrentPage: (page: number) => dispatch(setCurrentPageAC(page)),
		setTotalUsersCount: (usersCount: number) => dispatch(setTotalUsersCountAC(usersCount))
	}
}

export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType

const UsersContainer =  connect(mapStateToProps, mapDispatchToProps) (Users)

export default UsersContainer