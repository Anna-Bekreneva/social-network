import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import { appReducer } from 'store/app-reducer'

import { authReducer } from './auth-reducer'
import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile-reducer'
import sidebarReducer from './sidebar-reducer'
import UsersReducer from './users-reducer'

const rootReducer = combineReducers({
  profile: profileReducer,
  dialogs: dialogsReducer,
  sidebar: sidebarReducer,
  users: UsersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
})

const composeEnhancers =
  //@ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? //@ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.__store__ = store
