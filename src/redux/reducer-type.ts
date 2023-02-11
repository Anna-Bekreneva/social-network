import {addPostActionCreator, updatePostTextActionCreator} from './profile-reducer';
import {sendMessageActionCreator, updateMessageBodyActionCreator} from './dialogs-reducer';
import {
	followAC,
	setCurrentPageAC,
	setTotalUsersCountAC,
	setUsersAC,
	toggleIsFetchingAC,
	unfollowAC
} from './users-reducer';

export type ActionsType =
	ReturnType<typeof addPostActionCreator>
	| ReturnType<typeof updatePostTextActionCreator>
	| ReturnType<typeof updateMessageBodyActionCreator>
	| ReturnType<typeof sendMessageActionCreator>
	| ReturnType<typeof followAC>
	| ReturnType<typeof unfollowAC>
	| ReturnType<typeof setUsersAC>
	| ReturnType<typeof setCurrentPageAC>
	| ReturnType<typeof setTotalUsersCountAC>
	| ReturnType<typeof toggleIsFetchingAC>

export type SidebarType = {}

export type MessageType = {
	id: number
	message: string
}

type DialogType = {
	id: number
	name: string
}

export type PostType = {
	id: number
	message: string
	likesCount: number
}

export type ProfilePageType = {
	posts: Array<PostType>
	newPostText: string
}

export type DialogPageType = {
	dialogs: Array<DialogType>
	messages: Array<MessageType>
	newMessageBody: string
}
