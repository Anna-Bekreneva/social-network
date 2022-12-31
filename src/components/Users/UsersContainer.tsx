import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {followAC, setUsersAC, unfollowAC, UsersPageType, UserType} from '../../redux/users-reducer';
import {Dispatch} from 'redux';
import Users from './Users';

type MapStatePropsType = {
	usersPage: UsersPageType
}

type mapDispatchToPropsType = {
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	setUsers: (users: Array<UserType>) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({usersPage: state.users})

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
	return {
		follow: (userId: number) => dispatch(followAC(userId)),
		unfollow: (userId: number) => dispatch(unfollowAC(userId)),
		setUsers: (users: Array<UserType>) => dispatch(setUsersAC(users))
	}
}

export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType

const UsersContainer =  connect(mapStateToProps, mapDispatchToProps) (Users)

export default UsersContainer