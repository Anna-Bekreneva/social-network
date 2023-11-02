import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'

import { ActionsAuth, AuthType } from './reducerType'
import { AppStateType } from './store'

import { authAPI, securityAPI } from 'api'

const initialState: AuthType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
}

export const authReducer = (state: AuthType = initialState, action: ActionsAuth): AuthType => {
  switch (action.type) {
    case 'auth/SET_USER_DATA':
      return { ...state, ...action.payload, isAuth: true }
    case 'auth/GET_CAPTCHA_URL_SUCCESS':
      return { ...state, captchaUrl: action.payload.captchaUrl }
    default:
      return state
  }
}

export const setAuthUserDataAC = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
) =>
  ({
    type: 'auth/SET_USER_DATA',
    payload: { userId, email, login, isAuth },
  }) as const

export const getCaptchaUrlSuccess = (captchaUrl: string) =>
  ({
    type: 'auth/GET_CAPTCHA_URL_SUCCESS',
    payload: { captchaUrl },
  }) as const

type ThunkTypeAuth = ThunkAction<void, AppStateType, unknown, ActionsAuth>

export const getAuthUserData = (): ThunkTypeAuth => async dispatch => {
  const response = await authAPI.me()

  if (response.data.resultCode === 0) {
    const { id, login, email } = response.data.data

    dispatch(setAuthUserDataAC(id, login, email, true))
  }
}

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkTypeAuth =>
  async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData())
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl())
      }
      const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'

      dispatch(stopSubmit('login', { email: message }))
    }
  }

export const getCaptchaUrl = (): ThunkTypeAuth => async dispatch => {
  const response = await securityAPI.getCaptchaUrl()
  const captchaUrl = response.data.url

  dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkTypeAuth => async dispatch => {
  const response = await authAPI.logout()

  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData())
    dispatch(setAuthUserDataAC(null, null, null, false))
  }
}
