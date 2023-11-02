import React from 'react'

import { connect } from 'react-redux'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { Login, Navigation, HeaderContainer, Preloader, UsersContainer } from 'components'
import { withSuspense } from 'hoc'
import { initializeApp, AppStateType } from 'store'
const DialogsContainer = React.lazy(() => import('../components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('../components/Profile/ProfileContainer'))

import './App.css'

class App extends React.Component<AppPropsType> {
  catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
    alert('Some error occurred')
  }
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) return <Preloader />

    return (
      <div className="wrapper">
        <HeaderContainer />
        <Navigation />
        <main className="main">
          <Switch>
            <Route path="/" render={() => <Redirect to={'/profile'} />} exact />
            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="*" render={() => <div> 404 NOT FOUND </div>} />
          </Switch>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
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
  connect(mapStateToProps, { initializeApp })
)(App)
