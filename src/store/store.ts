import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import { ActionTypes, reducer as form } from "redux-form";
import thunk, { ThunkAction } from "redux-thunk";

import { dialogs } from "./dialogsReducer";
import { users } from "./usersReducer";

import { profile, app, auth } from "./";

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

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>;

//@ts-ignore
window.__store__ = store;
