import React from 'react';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {sendMessageActionCreator, updateMessageBodyActionCreator} from '../../redux/dialogs-reducer';
import {AppStateType} from '../../redux/redux-store';
import {DialogPageType} from '../../redux/reducer-type';
import {Dispatch} from 'redux';

type MapStatePropsType = {
	dialogsPage: DialogPageType
}

type MapDispatchToPropsType = {
	updateMessageBody: (text: string) => void
	sendMessage: () => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({dialogsPage: state.dialogs})

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
	return {
		updateMessageBody: (text: string) => dispatch(updateMessageBodyActionCreator(text)),
		sendMessage: () => dispatch(sendMessageActionCreator())
	}
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer