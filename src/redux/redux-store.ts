import {applyMiddleware, combineReducers, createStore} from 'redux';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import UsersReducer from './users-reducer';
import {authReducer} from './auth-reducer';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {appReducer} from "../redux/app-reducer";

const rootReducer = combineReducers({
	profile: profileReducer,
	dialogs: dialogsReducer,
	sidebar: sidebarReducer,
	users: UsersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store

