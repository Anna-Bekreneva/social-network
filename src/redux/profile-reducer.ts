import {ActionsTypeProfile, PostType} from './reducer-type';


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
	newPostText: string
	profile:  ProfileType
}

export type ProfileType = {
	aboutMe: string
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	contacts: ContactsType
	photos: PhotosType
}

const initialState: ProfilePageType = {
	posts: [
		{id: 1, message: 'Hi, how are you?', likesCount: 12},
		{id: 2, message: 'It\'s, my first post?', likesCount: 11},
		{id: 3, message: 'Blabla', likesCount: 11},
		{id: 4, message: 'Dadada', likesCount: 11}
	],
	newPostText: '',
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
	},
};

const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypeProfile): ProfilePageType => {
	switch (action.type) {
		case 'ADD-POST':
			const newPost: PostType = {
				id: 5, message: action.postText, likesCount: 0
			};
			return {...state, posts: [...state.posts, newPost], newPostText: ''};

		case 'UPDATE-NEW-POST-TEXT':
			return {...state, newPostText: action.newText};

		case 'SET-USER-PROFILE':
			return {...state, profile: {...action.profile}}
		default:
			return state;
	}
};

export const addPostActionCreator = (text: string) => ( {type: 'ADD-POST', postText: text} as const);

export const updatePostTextActionCreator = (text: string) => ( {type: 'UPDATE-NEW-POST-TEXT', newText: text} as const);

export const setUserProfile = (profile: ProfileType) => ( {type: 'SET-USER-PROFILE', profile} as const);

export default profileReducer;