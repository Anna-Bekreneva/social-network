import {ActionsTypeUser} from './reducer-type';
import {usersAPI} from 'api';
import {AppStateType} from './redux-store';
import {ThunkAction} from 'redux-thunk';

export type UsersPageType = {
	users: Array<UserType>
	pageSize: number
	totalUsersCount: number
	currentPage: number
	isFetching: boolean
	followingInProgress: Array<number>
}

export type UserType = {
	followed: boolean
	id: number
	name: string
	status: string
	uniqueUrlName: string
	photos: PhotosType
}

type PhotosType = {
	large: string
	small: string
}

const initialState: UsersPageType = {
	users: [],
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: []
};

const usersReducer = (state: UsersPageType = initialState, action: ActionsTypeUser): UsersPageType => {
	switch (action.type) {
		case 'FOLLOW':
			return {...state, users: state.users.map(user => user.id === action.userId ? {...user, followed: true} : user) }
		case 'UNFOLLOW':
			return {...state, users: state.users.map(user => user.id === action.userId ? {...user, followed: false} : user) }
		case 'SET-USERS':
			return {...state, users: [...action.users, ...state.users] }
		case 'SET-CURRENT-PAGE':
			return {...state, currentPage: action.currentPage }
		case 'SET-TOTAL-USERS-COUNT':
			return {...state, totalUsersCount: action.usersCount }
		case 'TOGGLE-IS-FETCHING':
			return {...state, isFetching: action.isFetching }
		case 'TOGGLE-IS-FOLLOWING-PROGRESS': {
			return {...state, followingInProgress: action.isFollowing ? [ ...state.followingInProgress, action.userId] : [ ...state.followingInProgress.filter(id => id !== action.userId)]}
		}
		default:
			return state
	}
};

export const followSuccess = (userId: number) => ({type: 'FOLLOW', userId} as const);

export const unfollowSuccess = (userId: number) => ({type: 'UNFOLLOW', userId} as const);

export const setUsers = (users: Array<UserType>) => ({type: 'SET-USERS', users} as const );

export const setCurrentPage = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage} as const)

export const setTotalUsersCount = (usersCount: number) => ({type: 'SET-TOTAL-USERS-COUNT', usersCount} as const)

export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const)

export const toggleIsFollowingProgress = (isFollowing: boolean, userId: number) => ({type: 'TOGGLE-IS-FOLLOWING-PROGRESS', isFollowing, userId} as const)

export type ThunkTypeUsers = ThunkAction<void, AppStateType, unknown, ActionsTypeUser>

export const requestUsers = (page: number, pageSize: number): ThunkTypeUsers => {
	return (dispatch) => {
		dispatch(toggleIsFetching(true));
		dispatch(setCurrentPage(page));
		usersAPI.getUsers(page, pageSize).then(data => {
			dispatch(toggleIsFetching(false));
			dispatch(setUsers(data.items));
			dispatch(setTotalUsersCount(data.totalCount));
		})
	}
}

export const follow = (userId: number): ThunkTypeUsers => {
	return (dispatch) => {
		dispatch(toggleIsFollowingProgress(true, userId))
		usersAPI.follow(userId)
		.then(response => {
			if (response.data.resultCode === 0) {
				dispatch(followSuccess(userId))
			}

			dispatch(toggleIsFollowingProgress(false, userId));
		})
	}
}

export const unfollow = (userId: number): ThunkTypeUsers => {
	return (dispatch) => {
		dispatch(toggleIsFollowingProgress(true, userId))
		usersAPI.unfollow(userId)
		.then(response => {
			if (response.data.resultCode === 0) {
				dispatch(unfollowSuccess(userId))
			}

			dispatch(toggleIsFollowingProgress(false, userId));
		})
	}
}

export default usersReducer;
