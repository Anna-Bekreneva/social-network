import {ActionsTypeUser} from './reducer-type';

export type UsersPageType = {
	users: Array<UserType>
	pageSize: number
	totalUsersCount: number
	currentPage: number
	isFetching: boolean
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
	isFetching: false
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
		default:
			return state
	}
};

export const follow = (userId: number) => ({type: 'FOLLOW', userId} as const);

export const unfollow = (userId: number) => ({type: 'UNFOLLOW', userId} as const);

export const setUsers = (users: Array<UserType>) => ({type: 'SET-USERS', users} as const );

export const setCurrentPage = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage} as const)

export const setTotalUsersCount = (usersCount: number) => ({type: 'SET-TOTAL-USERS-COUNT', usersCount} as const)

export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const)

export default usersReducer;