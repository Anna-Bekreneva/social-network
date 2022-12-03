import React from 'react';
import {sendMessageActionCreator, updateMessageBodyActionCreator} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {PropsType} from '../../App';

export const DialogsContainer: React.FC<PropsType> = (props) => {
	const onSendMessageClick = () => props.dispatch(sendMessageActionCreator());
	const onNewMessageChange = (text: string) => props.dispatch(updateMessageBodyActionCreator(text));

	return <Dialogs dispatch={props.dispatch} state={props.state.dialogs} updateMessageBody={onNewMessageChange} sendMessage={onSendMessageClick}/>;
};