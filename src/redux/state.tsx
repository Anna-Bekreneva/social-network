import {DialogItem} from '../components/Dialogs/DialogItem/DialogItem';
import React from 'react';
import {rerenderEntireTree} from '../index';

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
			]
		},
		sidebar: {}
	},
	_callSubscriber() {
		console.log('state changed')
	},
	getState() {
		return this._state;
	},
	subscribe(callback){
		this._callSubscriber = callback
	},
	dispatch(action) {
		if (action.type === 'ADD-POST') {
			const newPost= {
				id: 5,
				message: action.postText,
				likesCount: 0
			};
			this._state.profilePage.posts.push(newPost)
			this._state.profilePage.newPostText = ''
			rerenderEntireTree()
		} else if (action.type === 'UPDATE-NEW-POST-TEXT') {
			this._state.profilePage.newPostText = action.newText
			rerenderEntireTree()
		}
	}
}

type ActionsType = AddPostActionType | UpdatePostTextActionType

type AddPostActionType = {
	type: 'ADD-POST'
	postText: string
}

type UpdatePostTextActionType = {
	type: 'UPDATE-NEW-POST-TEXT'
	newText: string
}

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
}

export type StateType = {
	profilePage: ProfilePageType
	dialogsPage: DialogPageType
	sidebar: SidebarType
}

export const dialogElements = store._state.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);