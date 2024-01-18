import { stopSubmit } from "redux-form";

import { BaseThunkType, InferActionsTypes } from "../store";

import { authAPI, profileAPI, ResultCode, ResultCodeWithCaptcha, securityAPI } from "api";

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
  ava: "" as string | null,
};
export const auth = (state = initialState, action: ActionsAuth): AuthInitialStateType => {
  switch (action.type) {
    case "auth/SET-USER-DATA":
    case "auth/GET-CAPTCHA-URL-SUCCESS":
      return { ...state, ...action.payload };
    case "auth/SET-AVA":
      return { ...state, ava: action.ava };
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

  setAva: (ava: string | null) => ({ type: "auth/SET-AVA" as const, ava }),
};

export const getAuthUserData = (): BaseThunkType<ActionsAuth> => async (dispatch) => {
  const response = await authAPI.me();

  if (response.resultCode === ResultCode.Success) {
    const { id, login, email } = response.data;

    dispatch(authActions.setAuthUserData(id, email, login, true));
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

    if (response.resultCode === ResultCode.Success) {
      dispatch(getAuthUserData());
    } else {
      if (response.resultCode === ResultCodeWithCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      const message = response.messages.length > 0 ? response.messages[0] : "Some error";

      dispatch(stopSubmit("login", { _error: message }));
    }
  };

export const getCaptchaUrl = (): BaseThunkType<ActionsAuth> => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.url;

  dispatch(authActions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): BaseThunkType<ActionsAuth> => async (dispatch) => {
  const response = await authAPI.logout();

  if (response.resultCode === ResultCode.Success) {
    dispatch(authActions.setAuthUserData(null, null, null, false));
  }
};

export const getAva = (): BaseThunkType<ActionsAuth> => async (dispatch, getState) => {
  const myId = getState().auth.userId;
  if (myId) {
    const response = await profileAPI.getProfile(myId);
    dispatch(authActions.setAva(response.photos?.small));
  }
};

export type AuthInitialStateType = typeof initialState;
