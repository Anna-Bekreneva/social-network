import {ActionsType, SidebarType} from './reducer-type';

const initialState: SidebarType = {}

const sidebarReducer = (state: SidebarType = initialState, action: ActionsType): SidebarType => {
	return state
}

export default sidebarReducer;