import {ActionsAuth, AuthType} from './reducer-type';
import {AppStateType} from './redux-store';
import {authAPI} from '../api';
import {ThunkAction} from 'redux-thunk';

const initialState: AuthType = {
	userId: 2,
	email: '',
	login: '',
	isAuth: false
}

export const authReducer = (state: AuthType = initialState, action: ActionsAuth): AuthType => {
	switch (action.type) {
		case 'SET_USER_DATA':
			return { ...state, ...action.data, isAuth: true}
		default:
			return state
	}
};

export const seAuthUserDataAC = (userId: number, email: string, login: string) => ({type: 'SET_USER_DATA', data: {userId, email, login}} as const);

export type ThunkTypeAuth = ThunkAction<void, AppStateType, unknown, ActionsAuth>

export const getAuthUserData  = (): ThunkTypeAuth => (dispatch) => {
	return authAPI.me().then(response => {
		if (response.data.resultCode === 0) {
			let {userId, login, email} = response.data.data
			dispatch(seAuthUserDataAC(userId, login, email))
		}
	})
}
