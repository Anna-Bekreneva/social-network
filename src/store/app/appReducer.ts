import { BaseThunkType, getAuthUserData, InferActionsTypes } from "../index";

const initialState = {
  initialized: false,
};

export const app = (state: AppInitialStateType = initialState, action: ActionsApp): AppInitialStateType => {
  switch (action.type) {
    case "app/INITIALIZED-SUCCESS":
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const appActions = {
  initializedSuccess: () => ({ type: "app/INITIALIZED-SUCCESS" as const }),
};

type ActionsApp = InferActionsTypes<typeof appActions>;
export const initializeApp = (): BaseThunkType<ActionsApp> => async (dispatch) => {
  const promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(appActions.initializedSuccess());
  });
};

export type AppInitialStateType = typeof initialState;
