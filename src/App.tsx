import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import {Route} from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';


const App = () => {
	return (
		<div className="wrapper">
			<HeaderContainer/>
			<Navigation/>
			<main className="main">
				<Route path="/dialogs"
					   render={() => <DialogsContainer/>}/>

				<Route path="/profile/:userId?"
					   render={() => <ProfileContainer/>}/>

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
