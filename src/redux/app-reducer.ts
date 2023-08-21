import {ActionsApp, AppType} from './reducer-type';
import {AppStateType} from './redux-store';
import {ThunkAction} from 'redux-thunk';
import {getAuthUserData} from "redux/auth-reducer";

const initialState: AppType = {
    initialized: false
}

export const appReducer = (state: AppType = initialState, action: ActionsApp): AppType => {
    switch (action.type) {
        case "INITIALIZED-SUCCESS":
            return {...state, initialized: true}
        default:
            return state
    }
};

export const initializedSuccessAC = () => ({type: 'INITIALIZED-SUCCESS'} as const);

export type ThunkTypeAuth = ThunkAction<void, AppStateType, unknown, ActionsApp>

export const initializeApp = (): ThunkTypeAuth => async (dispatch) => {
    await dispatch(getAuthUserData())
    dispatch(initializedSuccessAC())
}
