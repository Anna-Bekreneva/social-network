import {rerenderEntireTree} from '../index';
import profileReducer, {addPostActionCreator, updatePostTextActionCreator} from './profile-reducer';
import dialogsReducer, {sendMessageActionCreator, updateMessageBodyActionCreator} from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

type StoreType = {
	_state: StateType
	_callSubscriber: () => void
	getState: () => StateType
	subscribe: (callback: () => void) => void
	dispatch: (action: ActionsType) => void
}

const store: StoreType = {
	_state: {
		profilePage: {
			posts: [
				{id: 1, message: 'Hi, how are you?', likesCount: 12},
				{id: 2, message: 'It\'s, my first post?', likesCount: 11},
				{id: 3, message: 'Blabla', likesCount: 11},
				{id: 4, message: 'Dadada', likesCount: 11}
			], newPostText: ''
		},

		dialogsPage: {
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
			], newMessageBody: ''
		}, sidebar: {}
	},
	_callSubscriber () {
		console.log('state changed');
	}, getState () {
		return this._state;
	}, subscribe (callback) {
		this._callSubscriber = callback;
	}, dispatch (action) {

		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
		this._state.sidebar = sidebarReducer(this._state.sidebar, action);
		rerenderEntireTree();
	}
};

type ActionsType =
	ReturnType<typeof addPostActionCreator>
	| ReturnType<typeof updatePostTextActionCreator>
	| ReturnType<typeof updateMessageBodyActionCreator>
	| ReturnType<typeof sendMessageActionCreator>

type SidebarType = {}

type MessageType = {
	id: number
	message: string
}

type DialogType = {
	id: number
	name: string
}

type PostType = {
	id: number
	message: string
	likesCount: number
}

type ProfilePageType = {
	posts: Array<PostType>
	newPostText: string
}

type DialogPageType = {
	dialogs: Array<DialogType>
	messages: Array<MessageType>
	newMessageBody: string
}

type StateType = {
	profilePage: ProfilePageType
	dialogsPage: DialogPageType
	sidebar: SidebarType
}