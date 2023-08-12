import {ActionsAuth, AuthType} from './reducer-type';
import {AppStateType} from './redux-store';
import {authAPI} from '../api';
import {ThunkAction} from 'redux-thunk';
import {stopSubmit} from "redux-form";

const initialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state: AuthType = initialState, action: ActionsAuth): AuthType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state, ...action.payload, isAuth: true}
        default:
            return state
    }
};

export const seAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET_USER_DATA',
    payload: {userId, email, login, isAuth}
} as const);

export type ThunkTypeAuth = ThunkAction<void, AppStateType, unknown, ActionsAuth>

export const getAuthUserData = (): ThunkTypeAuth => (dispatch) => {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {userId, login, email} = response.data.data
                dispatch(seAuthUserDataAC(userId, login, email, true))
            }
        })
}

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {

    return authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                dispatch(stopSubmit("login", {email: message}))
            }
        })
}

export const logout = (): ThunkTypeAuth => (dispatch) => {
    return authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
                dispatch(seAuthUserDataAC(null, null, null, false))
            }
        })
}
