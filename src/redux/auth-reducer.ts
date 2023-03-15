import {ActionsAuth, AuthType} from './reducer-type';

const initialState: AuthType = {
	userId: 2,
	email: '',
	login: '',
	isAuth: false
}

type seUserDataAT = ReturnType<typeof seAuthUserDataAC>

export const authReducer = (state: AuthType = initialState, action: ActionsAuth): AuthType => {
	switch (action.type) {
		case 'SET_USER_DATA':
			return { ...state, ...action.data, isAuth: true}
		default:
			return state
	}
};

export const seAuthUserDataAC = (userId: number, email: string, login: string) => ({type: 'SET_USER_DATA', data: {userId, email, login}} as const);