import React from 'react';
import {ActionsType, DialogPageType, MessageType} from './state';

const dialogsReducer = (state: DialogPageType, action: ActionsType) => {

	switch (action.type) {
		case 'UPDATE-NEW-MESSAGE-BODY':
			state.newMessageBody = action.body;
			return state;
		case 'SEND-MESSAGE':
			const body = state.newMessageBody;
			state.newMessageBody = '';
			const newMessage: MessageType = {
				id: 6, message: body,
			};
			state.messages.push(newMessage);
			return state;
		default:
			return state;
	}
};

export const updateMessageBodyActionCreator = (text: string) => ({
	type: 'UPDATE-NEW-MESSAGE-BODY', body: text
} as const);

export const sendMessageActionCreator = () => ({
	type: 'SEND-MESSAGE',
} as const);

export default dialogsReducer;

