import React from 'react'

import { withAuthRedirect } from 'hoc/withAuthRedirect'
import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'
import { sendMessageActionCreator } from 'store/dialogs-reducer'
import { DialogPageType } from 'store/reducer-type'
import { AppStateType } from 'store/redux-store'

import { Dialogs } from './Dialogs'

type MapStatePropsType = {
  dialogsPage: DialogPageType
  isAuth: boolean
}

type MapDispatchToPropsType = {
  sendMessage: (newMessageBody: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  dialogsPage: state.dialogs,
  isAuth: state.auth.isAuth,
})

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    sendMessage: (newMessageBody: string) => dispatch(sendMessageActionCreator(newMessageBody)),
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)
