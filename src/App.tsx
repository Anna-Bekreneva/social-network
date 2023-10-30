import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from 'redux/app-reducer';
import {AppStateType} from 'redux/redux-store';
import {Preloader} from "components/common/Preloader/Preloader";
import {withSuspense} from "hoc/withSuspense";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))


class App extends React.Component<AppPropsType> {
	catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
		alert('Some error occurred')
	}
	componentDidMount () {
		this.props.initializeApp()
		window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
	}

	componentWillUnmount() {
		window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
	}

	render() {
		if (!this.props.initialized) return <Preloader/>
		return (
			<div className="wrapper">
				<HeaderContainer/>
				<Navigation/>
				<main className="main">
					<Switch>
						<Route path="/" render={() => <Redirect to={'/profile'}/> } exact/>
						<Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
						<Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
						<Route path="/users" render={() => <UsersContainer/>}/>
						<Route path="/login" render={() => <Login/>}/>
						<Route path="*" render={() =>  <div> 404 NOT FOUND </div> }/>

						{/*<Route path="/settings" component={Settings}/>*/}
						{/*<Route path="/news" component={News}></Route>*/}
						{/*<Route path="/music" component={Music}></Route>*/}
					</Switch>
				</main>
			</div>
		);
	}
}

const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialized
})

type mapStateToPropsType = {
	initialized: boolean
}

type mapStateToDispatchType = {
	initializeApp: () => void
}

type AppPropsType = mapStateToPropsType & mapStateToDispatchType

export default compose<React.ComponentType>(
	withRouter,
	connect(mapStateToProps, {initializeApp}))(App);
