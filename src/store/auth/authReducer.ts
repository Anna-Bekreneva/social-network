import { stopSubmit } from "redux-form";

import { BaseThunkType, InferActionsTypes } from "../store";

import { authAPI, ResultCode, ResultCodeWithCaptcha, securityAPI } from "api";

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

export type AuthInitialStateType = typeof initialState;

export const auth = (state = initialState, action: ActionsAuth): AuthInitialStateType => {
  switch (action.type) {
    case "auth/SET-USER-DATA":
    case "auth/GET-CAPTCHA-URL-SUCCESS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

type ActionsAuth = InferActionsTypes<typeof authActions>;
export const authActions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: "auth/SET-USER-DATA" as const,
    payload: { userId, email, login, isAuth },
  }),

  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: "auth/GET-CAPTCHA-URL-SUCCESS" as const,
    payload: { captchaUrl },
  }),
};

export const getAuthUserData = (): BaseThunkType<ActionsAuth> => async (dispatch) => {
  const response = await authAPI.me();

  if (response.data.resultCode === ResultCode.Success) {
    const { id, login, email } = response.data.data;

    dispatch(authActions.setAuthUserData(id, login, email, true));
  }
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null,
  ): BaseThunkType<ActionsAuth | ReturnType<typeof stopSubmit>> =>
  async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === ResultCode.Success) {
      dispatch(getAuthUserData());
    } else {
      if (response.data.resultCode === ResultCodeWithCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";

      dispatch(stopSubmit("login", { _error: message }));
    }
  };

export const getCaptchaUrl = (): BaseThunkType<ActionsAuth> => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;

  dispatch(authActions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): BaseThunkType<ActionsAuth> => async (dispatch) => {
  const response = await authAPI.logout();

  if (response.data.resultCode === ResultCode.Error) {
    dispatch(authActions.setAuthUserData(null, null, null, false));
  }
};
