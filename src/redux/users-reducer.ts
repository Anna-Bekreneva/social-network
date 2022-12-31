import {ActionsType} from './reducer-type';

export type UsersPageType = {
	users: Array<UserType>
}

export type UserType = {
	followed: boolean
	id: number
	name: string
	status: string
	uniqueUrlName: any
	photos: PhotosType
	// id: number
	// photoUrl: string
	// followed: boolean
	// fullName: string
	// status: string
	// location: LocationType
}

type PhotosType = {
	large: string
	small: string
}

type LocationType = {
	city: string
	country: string
}

const initialState: UsersPageType = {
	users: [
		// {id: 1, photoUrl: 'https://i.pinimg.com/736x/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg', followed: false, fullName: 'Dmitry', status: "I'm a boss", location: {city: 'Minsk', country: 'Belarus'}},
		// {id: 2, photoUrl: 'https://i.pinimg.com/736x/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg', followed: true, fullName: 'Sasha', status: "I'm a boss too", location: {city: 'Moscow', country: 'Russia'}},
		// {id: 3, photoUrl: 'https://i.pinimg.com/736x/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg', followed: false, fullName: 'Andrew', status: "I'm a boss too", location: {city: 'Kiev', country: 'Ukraine'}},
	]
};

const usersReducer = (state: UsersPageType = initialState, action: ActionsType): UsersPageType => {
	switch (action.type) {
		case 'FOLLOW':
			return {...state, users: state.users.map(user => user.id === action.userId ? {...user, followed: true} : user) }
		case 'UNFOLLOW':
			return {...state, users: state.users.map(user => user.id === action.userId ? {...user, followed: false} : user) }
		case 'SET-USERS':
			return {...state, users: [...state.users, ...action.users] }
		default:
			return state
	}
};

export const followAC = (userId: number) => ( {
	type: 'FOLLOW', userId
} as const );

export const unfollowAC = (userId: number) => ( {
	type: 'UNFOLLOW', userId
} as const );

export const setUsersAC = (users: Array<UserType>) => ( {
	type: 'SET-USERS', users
} as const );

export default usersReducer;