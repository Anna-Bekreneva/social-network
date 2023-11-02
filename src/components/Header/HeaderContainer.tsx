import './Header.css'
import React from 'react'

import { connect } from 'react-redux'

import { Header } from './'

import { AppStateType, logout } from 'store'

type MapStatePropsType = {
  login: string | null
  isAuth: boolean
}

type MapDispatchToPropsType = {
  logout: () => void
}

class HeaderContainerInner extends React.Component<HeaderPropsType> {
  render() {
    return <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout} />
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
})

export type HeaderPropsType = MapStatePropsType & MapDispatchToPropsType

export const HeaderContainer = connect(mapStateToProps, { logout })(HeaderContainerInner)
