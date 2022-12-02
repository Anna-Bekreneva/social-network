import {ActionsType, DialogPageType, MessageType} from './store';

const initialState = {
	dialogs: [{id: 1, name: 'Dimych'}, {id: 2, name: 'Andrey'}, {id: 3, name: 'Sveta'}, {
		id: 4, name: 'Sasha'
	}, {id: 5, name: 'Viktor'}, {id: 6, name: 'Valera'},],

	messages: [{id: 1, message: 'Hi'}, {id: 2, message: 'How is your it-kamasutra'}, {
		id: 3, message: 'Yo'
	}, {id: 4, message: 'Yo'},], newMessageBody: ''
};

const dialogsReducer = (state: DialogPageType = initialState, action: ActionsType) => {

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

