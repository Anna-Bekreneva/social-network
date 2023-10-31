import React, { ComponentType } from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppStateType } from 'store/redux-store'

type MapStatePropsType = {
  isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
  }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {
  function RedirectComponent(props: MapStatePropsType) {
    let { isAuth, ...restProps } = props

    if (!isAuth) return <Redirect to={'/login'}></Redirect>

    return <Component {...(restProps as T)} />
  }

  const ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

  return ConnectedRedirectComponent
}
