import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Profile from './components/Profile/Profile';
import {Route} from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';


const App = () => {
	return (
		<div className="wrapper">
			<Header/>
			<Navigation/>
			<main className="main">
				<Route path="/dialogs"
					   render={() => <DialogsContainer/>}/>

				<Route path="/profile"
					   render={() => <Profile/>}/>

				<Route path="/users"
					   render={() => <UsersContainer/>}/>

				{/*<Route path="/settings" component={Settings}/>*/}
				{/*<Route path="/news" component={News}></Route>*/}
				{/*<Route path="/music" component={Music}></Route>*/}
			</main>
		</div>
	);
};

export default App;
