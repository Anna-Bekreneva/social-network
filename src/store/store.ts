import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { reducer as form } from "redux-form";
import thunk from "redux-thunk";

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

export type AppStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.__store__ = store;
