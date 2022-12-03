import React from 'react';
import {AppStateType} from './redux/redux-store';

const StoreContext = React.createContext({} as AppStateType);

type ProviderPropsType = {
	store: AppStateType
	children: React.ReactNode
}

export const Provider = (props: ProviderPropsType) => {
	return (
		<StoreContext.Provider value={props.store}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreContext;