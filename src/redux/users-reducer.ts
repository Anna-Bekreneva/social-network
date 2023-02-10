import {ActionsType} from './reducer-type';

export type UsersPageType = {
	users: Array<UserType>
	pageSize: number
	totalUsersCount: number
	currentPage: number
}

export type UserType = {
	followed: boolean
	id: number
	name: string
	status: string
	uniqueUrlName: any
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
	currentPage: 2,
};

const usersReducer = (state: UsersPageType = initialState, action: ActionsType): UsersPageType => {
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
		default:
			return state
	}
};

export const followAC = (userId: number) => ({type: 'FOLLOW', userId} as const);

export const unfollowAC = (userId: number) => ({type: 'UNFOLLOW', userId} as const);

export const setUsersAC = (users: Array<UserType>) => ({type: 'SET-USERS', users} as const );

export const setCurrentPageAC = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage} as const)

export const setTotalUsersCountAC = (usersCount: number) => ({type: 'SET-TOTAL-USERS-COUNT', usersCount} as const)

export default usersReducer;