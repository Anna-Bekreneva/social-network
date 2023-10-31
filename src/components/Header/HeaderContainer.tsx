import './Header.css'
import React from 'react'

import { connect } from 'react-redux'
import { logout } from 'store/auth-reducer'
import { AppStateType } from 'store/redux-store'

import Header from './Header'

type MapStatePropsType = {
  login: string | null
  isAuth: boolean
}

type MapDispatchToPropsType = {
  logout: () => void
}

class HeaderContainer extends React.Component<HeaderPropsType> {
  render() {
    return <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout} />
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
})

export type HeaderPropsType = MapStatePropsType & MapDispatchToPropsType

export default connect(mapStateToProps, { logout })(HeaderContainer)
