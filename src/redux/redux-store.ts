import {combineReducers, createStore} from 'redux';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';

const reducers = combineReducers({
	profile: profileReducer,
	dialogs: dialogsReducer,
	sidebar: sidebarReducer
});


const store = createStore(reducers);
export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
