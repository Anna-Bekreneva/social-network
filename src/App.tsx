import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Profile from './components/Profile/Profile';
import {Route} from 'react-router-dom';
import {Dialogs} from './components/Dialogs/Dialogs';
import {AppDispatch, AppStateType} from './redux/redux-store';

type PropsType = {
	state: AppStateType
	dispatch: AppDispatch
}

const App: React.FC<PropsType> = (props) => {
	return (
		<div className="wrapper">
			<Header/>
			<Navigation/>
			<main className="main">
				<Route path="/dialogs"
					   render={() =>
						   <Dialogs state={props.state.dialogs} dispatch={props.dispatch}/>}/>
				<Route path="/profile"
					   render={() =>
						   <Profile state={props.state.profile} dispatch={props.dispatch}/>}/>

				{/*<Route path="/settings" component={Settings}/>*/}
				{/*<Route path="/news" component={News}></Route>*/}
				{/*<Route path="/music" component={Music}></Route>*/}
			</main>
		</div>
	);
};

export default App;
