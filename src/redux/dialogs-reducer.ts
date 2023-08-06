import {ActionsTypeDialogs, DialogPageType, MessageType} from './reducer-type';

const initialState: DialogPageType = {
	dialogs: [
		{id: 1, name: 'Dimych'},
		{id: 2, name: 'Andrey'},
		{id: 3, name: 'Sveta'},
		{id: 4, name: 'Sasha'},
		{id: 5, name: 'Viktor'},
		{id: 6, name: 'Valera'},
	],

	messages: [
		{id: 1, message: 'Hi'},
		{id: 2, message: 'How is your it-kamasutra'},
		{id: 3, message: 'Yo'},
		{id: 4, message: 'Yo'},
	]
};

const dialogsReducer = (state: DialogPageType = initialState, action: ActionsTypeDialogs): DialogPageType  => {
	switch (action.type) {
		case 'SEND-MESSAGE':
			const body = action.newMessageBody;
			const newMessage: MessageType = {
				id: 6, message: body,
			};
			return {...state, messages: [...state.messages, newMessage]}
		default:
			return state;
	}
};

export const sendMessageActionCreator = (newMessageBody: string) => ( {
	type: 'SEND-MESSAGE',
	newMessageBody
} as const );

export default dialogsReducer;

