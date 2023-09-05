import {ActionsTypeProfile, PostType} from './reducer-type';
import {AppStateType} from './redux-store';
import {profileAPI, usersAPI} from 'api';
import {ThunkAction} from 'redux-thunk';

const initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s, my first post?', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dadada', likesCount: 11}
    ],
    profile: {
        aboutMe: '',
        userId: 0,
        lookingForAJobDescription: '',
        fullName: '',
        contacts: {
            youtube: '',
            website: '',
            vk: '',
            twitter: '',
            mainLink: '',
            instagram: '',
            github: '',
            facebook: '',
        },
        lookingForAJob: false,
        photos: {
            small: '',
            large: ''
        },
        status: 'string',
    },
};

const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypeProfile): ProfilePageType => {
    switch (action.type) {
        case 'profile/ADD-POST':
            const newPost: PostType = {
                id: 5, message: action.newPostText, likesCount: 0
            };
            return {...state, posts: [...state.posts, newPost]};

        case 'profile/SET-USER-PROFILE':
            return {...state, profile: {...action.profile}}
        case 'profile/SET-STATUS':
            return {...state, profile: {...state.profile, status: action.status}}
        case 'profile/DELETE-POST': {
            return {...state, posts: state.posts.filter(post => post.id !== action.id)}
        }
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText: string) => ({type: 'profile/ADD-POST', newPostText} as const);

export const setUserProfile = (profile: ProfileType) => ({type: 'profile/SET-USER-PROFILE', profile} as const);

export const setStatusActionCreator = (status: string) => ({type: 'profile/SET-STATUS', status} as const);

export const deletePost = (id: number) => ({type: 'profile/DELETE-POST', id} as const);

export type ThunkTypeProfile = ThunkAction<void, AppStateType, unknown, ActionsTypeProfile>

export const getUserProfile = (userId: number): ThunkTypeProfile => async (dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number): ThunkTypeProfile => (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatusActionCreator(response.data))
    })
}

export const updateStatus = (status: string): ThunkTypeProfile => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusActionCreator(status))
    }
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string
    large: string
}

export type ProfilePageType = {
    posts: Array<PostType>
    profile: ProfileType
}

export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    status: string;
}

export default profileReducer;
