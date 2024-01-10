import { BaseThunkType, getAuthUserData, InferActionsTypes } from "../index";

const initialState = {
  initialized: false,
};

type InitialStateType = typeof initialState;

export const app = (state: InitialStateType = initialState, action: ActionsApp): InitialStateType => {
  switch (action.type) {
    case "app/INITIALIZED-SUCCESS":
      return { ...state, initialized: true };
    default:
      return state;
  }
};

const appActions = {
  initializedSuccess: () => ({ type: "app/INITIALIZED-SUCCESS" }) as const,
};

type ActionsApp = InferActionsTypes<typeof appActions>;
export const initializeApp = (): BaseThunkType<ActionsApp> => async (dispatch) => {
  const promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(appActions.initializedSuccess());
  });
};
