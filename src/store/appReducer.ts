import { ThunkAction } from "redux-thunk";

import { ActionsApp, AppType, AppStateType, getAuthUserData } from "./";

const initialState: AppType = {
  initialized: false,
};

export const app = (state: AppType = initialState, action: ActionsApp): AppType => {
  switch (action.type) {
    case "INITIALIZED-SUCCESS":
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const initializedSuccessAC = () => ({ type: "INITIALIZED-SUCCESS" }) as const;

type ThunkTypeAuth = ThunkAction<void, AppStateType, unknown, ActionsApp>;

export const initializeApp = (): ThunkTypeAuth => async (dispatch) => {
  await dispatch(getAuthUserData());
  dispatch(initializedSuccessAC());
};
