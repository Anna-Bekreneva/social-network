import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {sendMessageActionCreator} from '../../redux/dialogs-reducer';
import {AppStateType} from '../../redux/redux-store';
import {DialogPageType} from '../../redux/reducer-type';
import {compose, Dispatch} from 'redux';
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStatePropsType = {
	dialogsPage: DialogPageType
}

type MapDispatchToPropsType = {
	sendMessage: (newMessageBody: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({dialogsPage: state.dialogs})

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
	return {
		sendMessage: (newMessageBody: string) => dispatch(sendMessageActionCreator(newMessageBody))
	}
}

export default compose<React.ComponentType>(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs)
