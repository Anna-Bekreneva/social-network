import {addPostActionCreator, updatePostTextActionCreator} from './profile-reducer';
import {sendMessageActionCreator, updateMessageBodyActionCreator} from './dialogs-reducer';
import {
	follow,
	setCurrentPage,
	setTotalUsersCount,
	setUsers,
	toggleIsFetching,
	unfollow
} from './users-reducer';

export type ActionsType =
	ReturnType<typeof addPostActionCreator>
	| ReturnType<typeof updatePostTextActionCreator>
	| ReturnType<typeof updateMessageBodyActionCreator>
	| ReturnType<typeof sendMessageActionCreator>
	| ReturnType<typeof follow>
	| ReturnType<typeof unfollow>
	| ReturnType<typeof setUsers>
	| ReturnType<typeof setCurrentPage>
	| ReturnType<typeof setTotalUsersCount>
	| ReturnType<typeof toggleIsFetching>

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
