import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import UsersReducer from './users-reducer';
import {authReducer} from './auth-reducer';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {appReducer} from "redux/app-reducer";

const rootReducer = combineReducers({
	profile: profileReducer,
	dialogs: dialogsReducer,
	sidebar: sidebarReducer,
	users: UsersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
});

const composeEnhancers =
	//@ts-ignore
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		//@ts-ignore
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.__store__ = store

