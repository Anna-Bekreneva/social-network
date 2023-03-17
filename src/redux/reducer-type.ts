import {addPostActionCreator, setUserProfile, updatePostTextActionCreator} from './profile-reducer';
import {sendMessageActionCreator, updateMessageBodyActionCreator} from './dialogs-reducer';
import {
	follow,
	setCurrentPage,
	setTotalUsersCount,
	setUsers,
	toggleIsFetching, toggleIsFollowingProgress,
	unfollow
} from './users-reducer';
import {seAuthUserDataAC} from './auth-reducer';

export type ActionsTypeUser =
	| ReturnType<typeof follow>
	| ReturnType<typeof unfollow>
	| ReturnType<typeof setUsers>
	| ReturnType<typeof setCurrentPage>
	| ReturnType<typeof setTotalUsersCount>
	| ReturnType<typeof toggleIsFetching>
	| ReturnType<typeof toggleIsFollowingProgress>

export type ActionsTypeProfile =
	ReturnType<typeof setUserProfile>
	| ReturnType<typeof addPostActionCreator>
	| ReturnType<typeof updatePostTextActionCreator>

export type ActionsTypeDialogs =
	ReturnType<typeof updateMessageBodyActionCreator>
	| ReturnType<typeof sendMessageActionCreator>

export type ActionsAuth =
	| ReturnType<typeof seAuthUserDataAC>

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

export type AuthType = {
	userId: number
	email: string
	login: string
	isAuth: boolean
}

export type DialogPageType = {
	dialogs: Array<DialogType>
	messages: Array<MessageType>
	newMessageBody: string
}
