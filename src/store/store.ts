import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'

import { dialogsReducer } from './dialogsReducer'
import profileReducer from './profileReducer'
import { sidebarReducer } from './sidebarReducer'
import UsersReducer from './usersReducer'

import { authReducer } from './'

import { appReducer } from 'store'

// work on the names
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
