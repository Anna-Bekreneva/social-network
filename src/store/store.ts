import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import { reducer as form } from "redux-form";
import thunk, { ThunkAction } from "redux-thunk";

import { app, auth, profile } from "./";
import { dialogs } from "./dialogs";
import { users } from "./users";

const rootReducer = combineReducers({
  profile,
  dialogs,
  users,
  auth,
  form,
  app,
});

const composeEnhancers =
  //@ts-ignore
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? //@ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

export type AppStateType = ReturnType<typeof rootReducer>;

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;

//@ts-ignore
window.__store__ = store;
