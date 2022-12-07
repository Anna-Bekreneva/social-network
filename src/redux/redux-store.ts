import {combineReducers, createStore} from 'redux';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';

const rootReducer = combineReducers({
	profile: profileReducer,
	dialogs: dialogsReducer,
	sidebar: sidebarReducer
});

export const store = createStore(rootReducer);

export type AppStateType = ReturnType<typeof rootReducer>
// export type AppDispatch = typeof store.dispatch

