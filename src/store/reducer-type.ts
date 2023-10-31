import { initializedSuccessAC } from 'store/app-reducer'

import { getCaptchaUrlSuccess, setAuthUserDataAC } from './auth-reducer'
import { sendMessageActionCreator } from './dialogs-reducer'
import {
  addPostActionCreator,
  deletePost,
  savePhotoSuccess,
  setStatusActionCreator,
  setUserProfile,
} from './profile-reducer'
import {
  followSuccess,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  toggleIsFollowingProgress,
  unfollowSuccess,
} from './users-reducer'

export type ActionsTypeUser =
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof unfollowSuccess>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof toggleIsFollowingProgress>

export type ActionsTypeProfile =
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof addPostActionCreator>
  | ReturnType<typeof setStatusActionCreator>
  | ReturnType<typeof deletePost>
  | ReturnType<typeof savePhotoSuccess>

export type ActionsTypeDialogs = ReturnType<typeof sendMessageActionCreator>

export type ActionsAuth =
  | ReturnType<typeof setAuthUserDataAC>
  | ReturnType<typeof getCaptchaUrlSuccess>

export type ActionsApp = ReturnType<typeof initializedSuccessAC>

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
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: null | string
}

export type AppType = {
  initialized: boolean
}

export type DialogPageType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
}
