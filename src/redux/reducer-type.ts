import {
	addPostActionCreator,
	setStatusActionCreator,
	setUserProfile,
} from './profile-reducer';
import {sendMessageActionCreator} from './dialogs-reducer';
import {
	followSuccess,
	setCurrentPage,
	setTotalUsersCount,
	setUsers,
	toggleIsFetching,
	toggleIsFollowingProgress,
	unfollowSuccess
} from './users-reducer';
import {seAuthUserDataAC} from './auth-reducer';

export type ActionsTypeUser =
	| ReturnType<typeof followSuccess>
	| ReturnType<typeof unfollowSuccess>
	| ReturnType<typeof setUsers>
	| ReturnType<typeof setCurrentPage>
	| ReturnType<typeof setTotalUsersCount>
	| ReturnType<typeof toggleIsFetching>
	| ReturnType<typeof toggleIsFollowingProgress>

export type ActionsTypeProfile =
	ReturnType<typeof setUserProfile>
	| ReturnType<typeof addPostActionCreator>
	| ReturnType<typeof setStatusActionCreator>

export type ActionsTypeDialogs =
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
}
