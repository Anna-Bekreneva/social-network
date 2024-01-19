import { getAuthUserData } from "../auth";
import { BaseThunkType, InferActionsTypes } from "../store";

const initialState = {
  initialized: false,
};

export const app = (state: AppInitialStateType = initialState, action: ActionsApp): AppInitialStateType => {
  switch (action.type) {
    case "initialize/INITIALIZED-SUCCESS":
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const appActions = {
  initializedSuccess: () => ({ type: "initialize/INITIALIZED-SUCCESS" as const }),
};

type ActionsApp = InferActionsTypes<typeof appActions>;
export const appReducer = (): BaseThunkType<ActionsApp> => async (dispatch) => {
  const promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(appActions.initializedSuccess());
  });
};

export type AppInitialStateType = typeof initialState;
