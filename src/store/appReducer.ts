import { ThunkAction } from "redux-thunk";

import { AppStateType, getAuthUserData } from "./";

type AppType = {
  initialized: boolean;
};

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
type ActionsApp = ReturnType<typeof initializedSuccessAC>;
export const initializeApp = (): ThunkTypeAuth => async (dispatch) => {
  await dispatch(getAuthUserData());
  dispatch(initializedSuccessAC());
};
