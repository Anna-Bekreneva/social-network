import React from 'react';
import {ActionsType, PostType, ProfilePageType} from './state';

const profileReducer = (state: ProfilePageType, action: ActionsType) => {
	switch (action.type) {
		case 'ADD-POST':
			const newPost: PostType = {
				id: 5, message: action.postText, likesCount: 0
			};
			state.posts.push(newPost);
			state.newPostText = '';
			return state;
		case 'UPDATE-NEW-POST-TEXT':
			state.newPostText = action.newText;
			return state;
		default:
			return state;
	}
}

export const addPostActionCreator = (text: string) => ({
	type: 'ADD-POST', postText: text
} as const);

export const updatePostTextActionCreator = (text: string) => ({
	type: 'UPDATE-NEW-POST-TEXT', newText: text
} as const);

export default profileReducer;