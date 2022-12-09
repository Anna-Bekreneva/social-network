import {combineReducers, createStore} from 'redux';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import UsersReducer from './users-reducer';

const rootReducer = combineReducers({
	profile: profileReducer,
	dialogs: dialogsReducer,
	sidebar: sidebarReducer,
	users: UsersReducer
});

export const store = createStore(rootReducer);

export type AppStateType = ReturnType<typeof rootReducer>

