import React from 'react';
import {rerenderEntireTree} from '../index';
import {text} from 'stream/consumers';

export type StoreType = {
	_state: StateType
	_callSubscriber: () => void
	getState: () => StateType
	subscribe: (callback: () => void) => void
	dispatch: (action: ActionsType) => void
}

export const store: StoreType = {
	_state: {
		profilePage: {
			posts: [
				{id: 1, message: 'Hi, how are you?', likesCount: 12},
				{id: 2, message: 'It\'s, my first post?', likesCount: 11},
				{id: 3, message: 'Blabla', likesCount: 11},
				{id: 4, message: 'Dadada', likesCount: 11}
			],
			newPostText: ''
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
			],
			newMessageBody: ''
		},
		sidebar: {}
	},
	_callSubscriber() {
		console.log('state changed');
	},
	getState() {
		return this._state;
	},
	subscribe(callback) {
		this._callSubscriber = callback;
	},
	dispatch(action) {
		if (action.type === 'ADD-POST') {
			const newPost: PostType = {
				id: 5,
				message: action.postText,
				likesCount: 0
			};
			this._state.profilePage.posts.push(newPost);
			this._state.profilePage.newPostText = '';
			rerenderEntireTree();
		} else
			if (action.type === 'UPDATE-NEW-POST-TEXT') {
				this._state.profilePage.newPostText = action.newText;
				rerenderEntireTree();
			} else
				if (action.type === 'UPDATE-NEW-MESSAGE-BODY') {
					this._state.dialogsPage.newMessageBody = action.body;
					rerenderEntireTree();
				} else
					if (action.type === 'SEND-MESSAGE') {
						const body = this._state.dialogsPage.newMessageBody
						this._state.dialogsPage.newMessageBody = '';
						const newMessage: MessageType = {
							id: 6,
							message: body,
						};
						this._state.dialogsPage.messages.push(newMessage);
						console.log(this._state.dialogsPage.messages)
						rerenderEntireTree();
					}
	}
};

export const addPostActionCreator = (text: string) => ({
	type: 'ADD-POST',
	postText: text
} as const);

export const updatePostTextActionCreator = (text: string) => ({
	type: 'UPDATE-NEW-POST-TEXT',
	newText: text
} as const);

export const updateMessageBodyActionCreator = (text: string) => ({
	type: 'UPDATE-NEW-MESSAGE-BODY',
	body: text
} as const);

export const sendMessageActionCreator = () => ({
	type: 'SEND-MESSAGE',
} as const);

type ActionsType =
	ReturnType<typeof addPostActionCreator> |
	ReturnType<typeof updatePostTextActionCreator> |
	ReturnType<typeof updateMessageBodyActionCreator> |
	ReturnType<typeof sendMessageActionCreator>

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

export type ProfilePageType = {
	posts: Array<PostType>
	newPostText: string
}

type DialogPageType = {
	dialogs: Array<DialogType>
	messages: Array<MessageType>
	newMessageBody: string
}

export type StateType = {
	profilePage: ProfilePageType
	dialogsPage: DialogPageType
	sidebar: SidebarType
}