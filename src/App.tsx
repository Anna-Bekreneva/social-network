import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Profile from './components/Profile/Profile';
import {Route} from 'react-router-dom';
import {Dialogs} from './components/Dialogs/Dialogs';
import {StoreType} from './redux/state';

type PropsType = {
	store: StoreType
}

const App: React.FC<PropsType> = (props) => {
	return (
		<div className="wrapper">
			<Header/>
			<Navigation/>
			<main className="main">
				<Route path="/dialogs"
					   render={() =>
						   <Dialogs _state={props.store._state}
									dispatch={props.store.dispatch.bind(props.store)}
									_callSubscriber={props.store._callSubscriber}
									getState={props.store.getState}
									subscribe={props.store.subscribe}
						   />}
				/>
				<Route path="/profile"
					   render={() =>
						   <Profile _state={props.store._state}
									dispatch={props.store.dispatch.bind(props.store)}
									_callSubscriber={props.store._callSubscriber}
									getState={props.store.getState}
									subscribe={props.store.subscribe}
						   />}
				/>

				{/*<Route path="/settings" component={Settings}/>*/}
				{/*<Route path="/news" component={News}></Route>*/}
				{/*<Route path="/music" component={Music}></Route>*/}
			</main>
		</div>
	);
};

export default App;
