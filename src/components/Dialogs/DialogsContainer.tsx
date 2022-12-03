import React from 'react';
import {sendMessageActionCreator, updateMessageBodyActionCreator} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {PropsType} from '../../App';
import StoreContext from '../../StoreContext';

export const DialogsContainer: React.FC<PropsType> = (props) => {
	const onSendMessageClick = () => props.dispatch(sendMessageActionCreator());
	const onNewMessageChange = (text: string) => props.dispatch(updateMessageBodyActionCreator(text));

	return (
		<StoreContext.Consumer>
			{
				(store)	=> (
					<Dialogs dispatch={props.dispatch} state={store.dialogs} updateMessageBody={onNewMessageChange} sendMessage={onSendMessageClick}/>
				)
		}
		</StoreContext.Consumer>
	)
};